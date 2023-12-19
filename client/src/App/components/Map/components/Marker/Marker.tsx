import maplibregl from "maplibre-gl";
import { useMapContext } from "../../Map";
import { useEffect } from "react";

const Marker = () => {
    
    const map: any = useMapContext();

    useEffect(() => {
        if (map.current) {
            const marker = new maplibregl.Marker({color: "#FFFFFF"})
            .setLngLat([-83.01599036, 40.00222129])
            .addTo(map.current);
        }
    }, [map])
    
    return ( null );
}
 
export default Marker;