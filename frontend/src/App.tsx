import { FileUploader } from "./components/FileUploader"
import { MapView } from "./components/MapView"
import { ImagePreview } from "./components/ImagePreview"
import { ExifPreview } from "./components/ExifPreview"
import { Alert } from "./components/Alert"
import { useStore } from "./store/useStore"
import "./styles/theme.css"

function App() {
  const { alert, hideAlert } = useStore()

  return (
    <>
      <div className="h-screen flex bg-white">
        <FileUploader />
        <div className="flex-1 flex flex-col">
          <ImagePreview />
          <MapView />
        </div>
        <ExifPreview />
      </div>
      
      <Alert
        show={alert.show}
        onClose={hideAlert}
        title={alert.title}
        message={alert.message}
        type={alert.type}
      />
    </>
  )
}

export default App
