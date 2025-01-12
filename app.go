package main

import (
	"context"
	"fmt"
)

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}

type GetExifParams struct {
	ImagePath string `json:"image_path"`
}
type GetExifResponse struct {
	Latitude  float64 `json:"latitude"`
	Longitude float64 `json:"longitude"`
	Altitude  float64 `json:"altitude"`
	Error     string  `json:"error"`
}

func (a *App) GetGPSExif(params GetExifParams) GetExifResponse {
	handler := NewExifHandler(params.ImagePath)
	gpsInfo, err := handler.GetGPSInfo()
	if err != nil {
		return GetExifResponse{Error: err.Error()}
	} else {
		return GetExifResponse{
			Latitude:  gpsInfo.Latitude,
			Longitude: gpsInfo.Longitude,
			Altitude:  gpsInfo.Altitude,
		}
	}
}

type SetExifParams struct {
	ImagePath string  `json:"image_path"`
	Latitude  float64 `json:"latitude"`
	Longitude float64 `json:"longitude"`
}
type SetExifResponse struct {
	Error string `json:"error"`
}

func (a *App) SetGPSExif(params SetExifParams) SetExifResponse {
	handler := NewExifHandler(params.ImagePath)
	err := handler.SetGPSInfo(params.Latitude, params.Latitude)
	if err != nil {
		return SetExifResponse{Error: err.Error()}
	} else {
		return SetExifResponse{}
	}
}
