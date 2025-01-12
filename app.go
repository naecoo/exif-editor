package main

import (
	"context"
	"fmt"
	"log"
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

func (a *App) GetGPSExif(path string) string {
	handler := NewExifHandler(path)
	gpsInfo, err := handler.GetGPSInfo()
	if err != nil {
		log.Fatalf("无法读取 GPS 信息: %v", err)
	}
	return gpsInfo
}

func (a *App) SetGPSExif(path string, latitude, longitude float64) error {
	handler := NewExifHandler(path)
	return handler.SetGPSInfo(latitude, longitude)
}
