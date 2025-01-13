import { FileUploader } from "./components/FileUploader"
import { MapView } from "./components/MapView"
import { ExifPreview } from "./components/ExifPreview"
import { Alert } from "./components/Alert"
import { useStore } from "./store/useStore"
import "leaflet/dist/leaflet.css"

function App() {
  const { alert, hideAlert } = useStore()

  return (
    <>
      <div className="h-screen flex">
        <FileUploader />
        <MapView />
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
