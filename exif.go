package main

import (
	"bytes"
	"fmt"
	"os"

	exif "github.com/dsoprea/go-exif/v3"
)

// ExifHandler 结构体封装 EXIF 相关操作
type ExifHandler struct {
	ImagePath string // 图像文件路径
}

// NewExifHandler 创建一个新的 ExifHandler 实例
func NewExifHandler(imagePath string) *ExifHandler {
	return &ExifHandler{
		ImagePath: imagePath,
	}
}

// GPSInfo 结构体用于存储 GPS 信息
type GPSInfo struct {
	Latitude  float64 `json:"latitude"`  // 纬度
	Longitude float64 `json:"longitude"` // 经度
	Altitude  float64 `json:"altitude"`  // 海拔
}

// GetGPSInfo 读取图像的 GPS 信息并以 JSON 形式返回
func (h *ExifHandler) GetGPSInfo() (*GPSInfo, error) {
	// 读取图像文件
	data, err := os.ReadFile(h.ImagePath)
	if err != nil {
		return nil, fmt.Errorf("无法读取图像文件: %v", err)
	}

	// 解析 EXIF 数据
	rawExif, err := exif.SearchAndExtractExif(data)
	if err != nil {
		return nil, fmt.Errorf("无法解析 EXIF 数据: %v", err)
	}

	// 获取 EXIF 标签
	tags, _, err := exif.GetFlatExifData(rawExif, nil)
	if err != nil {
		return nil, fmt.Errorf("无法获取 EXIF 标签: %v", err)
	}

	// 解析 GPS 信息
	gpsInfo := GPSInfo{}
	for _, tag := range tags {
		switch tag.TagName {
		case "GPSLatitude":
			gpsInfo.Latitude, err = parseGPSCoordinate(tag.Formatted)
			if err != nil {
				return nil, fmt.Errorf("无法解析纬度: %v", err)
			}
		case "GPSLongitude":
			gpsInfo.Longitude, err = parseGPSCoordinate(tag.Formatted)
			if err != nil {
				return nil, fmt.Errorf("无法解析经度: %v", err)
			}
		case "GPSAltitude":
			gpsInfo.Altitude, err = parseGPSAltitude(tag.Formatted)
			if err != nil {
				return nil, fmt.Errorf("无法解析海拔: %v", err)
			}
		}
	}

	return &gpsInfo, nil

	// 将 GPS 信息转换为 JSON
	// jsonData, err := json.Marshal(gpsInfo)
	// if err != nil {
	// 	return nil, fmt.Errorf("无法生成 JSON: %v", err)
	// }

	// return string(jsonData), nil
}

// SetGPSInfo 修改图像的 GPS 信息（经纬度）
func (h *ExifHandler) SetGPSInfo(latitude float64, longitude float64) error {
	// 读取图像文件
	data, err := os.ReadFile(h.ImagePath)
	if err != nil {
		return fmt.Errorf("无法读取图像文件: %v", err)
	}

	// 解析 EXIF 数据
	rawExif, err := exif.SearchAndExtractExif(data)
	if err != nil {
		return fmt.Errorf("无法解析 EXIF 数据: %v", err)
	}

	// 获取 EXIF 标签
	tags, _, err := exif.GetFlatExifData(rawExif, nil)
	if err != nil {
		return fmt.Errorf("无法获取 EXIF 标签: %v", err)
	}

	// 修改 GPS 信息
	for _, tag := range tags {
		switch tag.TagName {
		case "GPSLatitude":
			tag.Formatted = formatGPSCoordinate(latitude)
		case "GPSLongitude":
			tag.Formatted = formatGPSCoordinate(longitude)
		}
	}

	// 将修改后的 EXIF 数据写回图像
	// FIXME: bug
	if err := writeExifData(h.ImagePath, rawExif); err != nil {
		return fmt.Errorf("无法写回 EXIF 数据: %v", err)
	}

	return nil
}

// parseGPSCoordinate 解析 GPS 坐标（纬度或经度）
func parseGPSCoordinate(value string) (float64, error) {
	var degrees, minutes, seconds float64
	_, err := fmt.Sscanf(value, "%f,%f,%f", &degrees, &minutes, &seconds)
	if err != nil {
		return 0, fmt.Errorf("无法解析 GPS 坐标: %v", err)
	}
	return degrees + minutes/60 + seconds/3600, nil
}

// parseGPSAltitude 解析 GPS 海拔
func parseGPSAltitude(value string) (float64, error) {
	var altitude float64
	_, err := fmt.Sscanf(value, "%f", &altitude)
	if err != nil {
		return 0, fmt.Errorf("无法解析 GPS 海拔: %v", err)
	}
	return altitude, nil
}

// formatGPSCoordinate 将十进制的 GPS 坐标转换为 EXIF 格式
func formatGPSCoordinate(value float64) string {
	degrees := int(value)
	minutes := int((value - float64(degrees)) * 60)
	seconds := (value - float64(degrees) - float64(minutes)/60) * 3600
	return fmt.Sprintf("%d,%d,%d", degrees, minutes, int(seconds))
}

// writeExifData 将修改后的 EXIF 数据写回图像文件
func writeExifData(imagePath string, rawExif []byte) error {
	// 读取图像文件
	data, err := os.ReadFile(imagePath)
	if err != nil {
		return fmt.Errorf("无法读取图像文件: %v", err)
	}

	// 替换 EXIF 数据
	exifStart := bytes.Index(data, []byte("Exif"))
	if exifStart == -1 {
		return fmt.Errorf("未找到 EXIF 数据")
	}

	// 替换原始 EXIF 数据
	copy(data[exifStart:], rawExif)

	// 写回图像文件
	if err := os.WriteFile(imagePath, data, 0644); err != nil {
		return fmt.Errorf("无法写回图像文件: %v", err)
	}

	return nil
}
