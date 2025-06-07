import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

const FindDermatologist = () => {
  const [locationDetails, setLocationDetails] = useState(null);
  const [error, setError] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const apiKey = "AlzaSy_AgehiyhCWmKMCGjDiBBhZxYnn9BPTMuA";

  useEffect(() => {
    if (lat && lon) {
      loadGoMapsScript();
    }
  }, [lat, lon]);

  const loadGoMapsScript = () => {
    const script = document.createElement("script");
    script.src = `https://maps.gomaps.pro/maps/api/js?key=${apiKey}&libraries=geometry,places&callback=initMap`;
    script.async = true;
    document.body.appendChild(script);
  };

  const getLocation = () => {
    setIsLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        getPosition,
        () => {
          setError("Geolocation not supported or permission denied.");
          setIsLoading(false);
        }
      );
    } else {
      setError("Geolocation not supported by your browser.");
      setIsLoading(false);
    }
  };

  const getPosition = async (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    setLat(latitude);
    setLon(longitude);
    await fetchAddress(latitude, longitude);
    await findNearbyDoctors(latitude, longitude);
    setIsLoading(false);
  };

  const fetchAddress = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://maps.gomaps.pro/maps/api/geocode/json?latlng=${lat},${lon}&key=${apiKey}`
      );
      const data = await response.json();

      if (data.status === "OK") {
        const addressComponents = data.results[0].address_components;
        const formattedAddress = data.results[0].formatted_address;

        const locationData = {
          building: getComponent(addressComponents, "premise"),
          area: getComponent(addressComponents, "sublocality"),
          landmark: getComponent(addressComponents, "point_of_interest"),
          fullAddress: formattedAddress,
        };

        setLocationDetails(locationData);
      } else {
        setError("Unable to fetch address details.");
      }
    } catch {
      setError("Error fetching address. Try again later.");
    }
  };

  const getComponent = (components, type) => {
    const found = components.find((comp) => comp.types.includes(type));
    return found ? found.long_name : "Not Available";
  };

  const findNearbyDoctors = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://maps.gomaps.pro/maps/api/place/nearbysearch/json?location=${lat},${lon}&radius=5000&type=doctor&keyword=dermatologist&key=${apiKey}`
      );
      const data = await response.json();

      if (data.status === "OK") {
        setDoctors(data.results);
      } else {
        setDoctors([]);
      }
    } catch {
      setDoctors([]);
    }
  };

  return (
    <div className="flex flex-col md:flex-row bg-white min-h-screen font-semibold">
      <Sidebar />
      <div className="flex-1 p-4 pb-28 md:pb-6">
        <Navbar />
        <h2 className="text-2xl md:text-3xl font-bold my-6 text-gray-800 text-center md:text-left">
          Find Nearby Dermatologists
        </h2>

        {error && <p className="text-red-600 text-center mb-4">{error}</p>}

        {!locationDetails ? (
          <div className="flex justify-center">
            <button
              onClick={getLocation}
              className="bg-gradient-to-r font-semibold from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center">
                  <span>Loading...</span>
                  <div className="ml-2 animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                </div>
              ) : (
                "Get Location"
              )}
            </button>
          </div>
        ) : (
          <>
            <div className="flex flex-col md:flex-row gap-6 mt-8">
              <div className="w-full md:w-1/2 text-center md:text-left">
                <p className="text-md sm:text-lg text-gray-700">
                  <strong>Full Address:</strong>{" "}
                  <span className="text-gray-900 font-bold">{locationDetails.fullAddress}</span>
                </p>
                <p className="mt-2 text-md sm:text-lg text-gray-700">
                  <strong>Area:</strong>{" "}
                  <span className="text-gray-900 font-bold">{locationDetails.area}</span>
                </p>
              </div>
              {lat && lon && (
                <div className="w-full md:w-1/2">
                  <iframe
                    src={`https://maps.gomaps.pro/maps?q=${lat},${lon}&output=embed`}
                    width="100%"
                    height="250"
                    className="rounded-lg shadow-md"
                    loading="lazy"
                  ></iframe>
                </div>
              )}
            </div>

            <h3 className="text-xl md:text-2xl font-bold mt-8 text-gray-800 text-center md:text-left">
              List of Nearby Dermatologists:
            </h3>

            {doctors.length > 0 ? (
              <ul className="mt-4  space-y-4">
                {doctors.map((doctor, index) => (
                  <li
                    key={index}
                    className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-gray-100 p-4 rounded-lg shadow hover:shadow-md transition"
                  >
                    <div className="flex-1">
                      <p className="text-lg font-bold text-gray-800">{doctor.name}</p>
                      <p className="text-gray-600 text-sm mt-1">{doctor.vicinity}</p>
                      <p className="text-sm font-semibold text-green-700 bg-green-100 inline-block mt-2 py-1 px-3 rounded-full">
                        Rating: {doctor.rating ? doctor.rating : "N/A"} ⭐
                      </p>
                    </div>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${doctor.geometry.location.lat},${doctor.geometry.location.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all text-sm font-semibold w-full text-center md:w-auto"
                    >
                      Get Directions
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-gray-600 text-center">No dermatologists found nearby.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default FindDermatologist;
