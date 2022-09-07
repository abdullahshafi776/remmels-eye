import React, { useState, useRef, useEffect } from "react"
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
  MarkerClusterer,
} from "@react-google-maps/api"
import styles from "../styles/Location/location.module.scss"
import {} from "@googlemaps/markerclusterer"
import { Col, Row } from "antd"
import useSupercluster from "use-supercluster"
// import Mapp from "./mapp"
// import { stores } from "./data"
import { AimOutlined } from "antd"
import { BiCurrentLocation } from "react-icons/bi"
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete"
import { Cluster } from "@react-google-maps/marker-clusterer"

const options = {
  disableDefaultUI: true,
  zoomControl: true,
}
const stores = [
  // USA

  {
    id: 1,
    name: "Optik USA",
    address: "3575 NE 207 St #B6A, Aventura, FL 33180",
    tel: "305.354.2020",
    country: "United States",
  },
  {
    id: 2,
    name: "The Eyeglass Place",
    address: "430 South Dixie Highway, Coral Gables,FL 33146",
    tel: "305.669.3890",
    country: "United States",
    lat: 25.725613534079642,
    lng: -80.26280903068287,
  },
  {
    id: 3,
    name: "Eye Catchers Optique",
    address: "318 East Palmetto Park Road,Boca Raton,FL 33432",
    tel: "561.338.0081",
    country: "United States",
    lat: 26.350625060095226,
    lng: -80.081210871164,
  },
  {
    id: 4,
    name: "Oberti Luxury World",
    address: "51 NE 40th St,Miami, FL 33137",
    tel: "786.431.5280",
    country: "United States",
  },
  {
    id: 5,
    name: "Bustelo’s Optical",
    address: "11241 SW 40th St,Miami, FL 33165",
    tel: "786.431.1625",
    country: "United States",
    lat: 25.73437729734589,
    lng: -80.37646665767201,
  },
  {
    id: 6,
    name: "Daluz Optical",
    address:
      "4528 W 12th Ave, Hialeah, FL 33012, Miami, Florida Twin Towers Shopping Center",
    tel: "+1 305-557-6777",
    country: "United States",
    lat: 25.863422982293002,
    lng: -80.306987215344,
  },
  {
    id: 7,
    name: "Eyewear Candy Optical",
    address: "5062 W. Atlantic Ave. Delray Beach FL 33484",
    tel: "(561) 404-8353",
    country: "United States",
    lat: 26.456915922442736,
    lng: -80.12435931534398,
  },

  // Puerto Rico

  {
    id: 8,
    name: "Eyewear Shop",
    address: "The Market Place at Montehiedra  Local 4B San Juan PR 00926",
    tel: "787-520-8884",
    country: "Puerto Rico",
    lat: 18.336701609897467,
    lng: -66.06983208650803,
  },
  {
    id: 9,
    name: "Clinica Visual Aguadilla",
    address: "Carr. 107, Aguadilla, Puerto Rico",
    tel: "+1 787 891 4400",
    country: "Puerto Rico",
    lat: 18.446171129063842,
    lng: -67.14775951534399,
  },
  {
    id: 10,
    name: "Catala Eye Care",
    address:
      "La Sierra Town, Carr 172 km 20.6, Bo. Cañaboncito Caguas, 00727 PR",
    tel: "(787) 286-8001",
    country: "Puerto Rico",
    lat: 18.209202559824263,
    lng: -66.10415396092853,
  },
  {
    id: 11,
    name: "Bright Vision Optometry",
    address: "Carr. 115 Asomante, Aguada, Puerto Rico",
    tel: "+1 787-589-7468",
    country: "Puerto Rico",
    lat: 18.38564867965309,
    lng: -67.17752860325392,
  },
  {
    id: 12,
    name: "Anteojos Di Moda",
    address: "Metro Plaza, Caguas, Puerto Rico 00725",
    tel: "",
    country: "Puerto Rico",
    lat: 18.244531645929158,
    lng: -66.03972827442006,
  },
  {
    id: 13,
    name: "Tu Vision Optika",
    address: "Calle Georgetti 38, Comerio 00782, Puerto Rico",
    tel: "+1 787 693 3283",
    country: "Puerto Rico",
  },

  // Brazil

  {
    id: 14,
    name: "LENTESDELUXO",
    address:
      "SHIS Qi 28 CONJUNTO 6 CASA 12 LAGO SUL BRASÍLIA DF 71670260 BRASIL",
    tel: "+55 21991682522",
    country: "Brazil",
  },

  // Barbados

  {
    id: 15,
    name: "Belleville Optical",
    address: "#7 Chelwood 8th Avenue, Belleville St.Michael Barbados",
    tel: "+1 246 437 3564",
    country: "Barbados",
    lat: 13.09814,
    lng: -59.60203,
  },
  {
    id: 16,
    name: "Insight Optical",
    address: "James Fort Building, Hincks St, Bridgetown, Barbados",
    tel: "+1 246-426-9970",
    country: "Barbados",
    lat: 13.09706731907493,
    lng: -59.6190027,
  },

  // St. Vincent & the Grenadines

  {
    id: 17,
    name: "OSV GROUP",
    address:
      "Glen Main Road Calliaqua VC0274 Box 1691 Kingstown St. Vincent & the Grenadines",
    tel: "(784) 457-5000",
    country: "St. Vincent & the Grenadines",
    lat: 13.139713166478865,
    lng: -61.195018457672,
  },

  // Uruguay

  {
    id: 18,
    name: "Óptica fornio",
    address: "José ellauri 657, Montevideo",
    tel: "+598 2711 3231",
    country: "St. Vincent & the Grenadines",
    lat: -34.91852917490241,
    lng: -56.155996073015984,
  },
  {
    id: 19,
    name: "Óptica Briozzo",
    address: "San José 1260, Montevideo",
    tel: "+598 2902 5051",
    country: "St. Vincent & the Grenadines",
    lat: -34.90660582957324,
    lng: -56.188967403703984,
  },
  {
    id: 20,
    name: "Enfoque Visión",
    address: "Av Brasil 2698, Montevideo",
    tel: "+598 2707 6006",
    country: "St. Vincent & the Grenadines",
    lat: -34.90830823985922,
    lng: -56.15594294417999,
  },

  // Israel

  {
    id: 21,
    name: "Belisima Optician",
    address: "Carlebach St 39, Tel Aviv-Yafo, Israel",
    tel: "+972 3-624-3555",
    country: "Israel",
    lat: 32.070559718250934,
    lng: 34.782387684655994,
  },
  {
    id: 22,
    name: "Belisima Optician",
    address: "Shmuel HaNatziv St 4, Netanya, Israel",
    tel: "",
    country: "Israel",
  },
  {
    id: 23,
    name: "Belisima Optician",
    address: "Yosef Lishanski Blvd 9, Rishon LeTsiyon, Israel",
    tel: "",
    country: "Israel",
  },
  {
    id: 24,
    name: "Belisima Optician",
    address: "Yoseftal St 92, Bat Yam, Israel",
    tel: "",
    country: "Israel",
  },

  // Japan
  {
    id: 25,
    name: "Neu optical store",
    address:
      "3-1-28-1F, Yuigahama, Kamakura-shi, Kanagawa-ken, Japan, 248-0014",
    tel: "+81 467-22-4766",
    country: "Japan",
    lat: 35.3146151885847,
    lng: 139.54545041349198,
  },

  // Greece

  {
    id: 26,
    name: "OPTIC SHOP",
    address: "Leoforos Irinis 42, Ilioupoli PO 16345",
    tel: "+30 210 9918722",
    country: "Greece",
    lat: 37.933533524698554,
    lng: 23.756065099999997,
  },
  {
    id: 27,
    name: "Optika Garifallou",
    address: "Egnatia 124, Thessaloniki 546 22, Greece",
    tel: "+30 231 024 2007",
    country: "Greece",
  },
]

const MyComponent = () => {
  const [libraries] = useState(["places"])
  const mapref = useRef()
  const [name, setName] = useState("")
  const [address, setAddress] = useState("")
  const [zoom, setZoom] = useState(2)
  const [bounds, setBounds] = useState(null)

  function initAutocomplete() {
    // Create the search box and link it to the UI element.
    const input = document.getElementById("pac-input")
    const searchBox = new google.maps.places.SearchBox(input)

    searchBox.addListener("places_changed", () => {
      const places = searchBox.getPlaces()

      console.log(places)
      // console.log(places)
      var latitude = Number(places[0].geometry.location.lat())
      var longitude = Number(places[0].geometry.location.lng())

      var address = places[0].formatted_address
      var new_address = places[0].address_components
        ? places[0].address_components[places[0].address_components.length - 1]
            .long_name
        : places[0].formatted_address

      setName(address)
      const val = stores.filter((shop) => shop.country == new_address)
      console.log(val)
      setShops(val)
      setCenter({ lat: Number(latitude), lng: Number(longitude) })
      setZoom(4)
      if (places.length == 0) {
        return
      }
    })
  }

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDsbaiwJKfNNSgsRiZBFkXdzxHnJTfcuRw",
    libraries: libraries,
  })
  const [coordinates, setCoordinates] = React.useState({
    lat: 15.4542,
    lng: 18.7322,
  })

  const [center, setCenter] = React.useState({
    lat: parseFloat(coordinates.lat),
    lng: parseFloat(coordinates.lng),
  })

  const [selected, setSelected] = useState(null)
  const [shops, setShops] = useState([])

  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value)
    const latLng = await getLatLng(results[0])
    setAddress(value)
    setCoordinates(latLng)
    setCenter(latLng)
    setZoom(4)
  }

  const searchlocation = (latitude, longitude) => {
    setCenter({ lat: latitude, lng: longitude })
    setZoom(16)
  }

  // const sendcountry = (c) => {
  //   const result = stores.filter((e) => {
  //     return e.country == c
  //   })
  //   setShops(result)
  // }
  const setlocation = (shop) => {
    setSelected(shop)
  }

  const nav = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }

        setCenter({ lat: Number(pos.lat), lng: Number(pos.lng) })
        setZoom(4)
        const val = stores.filter((shop) => shop.country == "Puerto Rico")
        setShops(val)

        const geocoder = new google.maps.Geocoder()
        geocodeLatLng(geocoder)

        function geocodeLatLng(geocoder) {
          const latlng = { lat: pos.lat, lng: pos.lng }

          geocoder.geocode({ location: latlng }).then((response) => {
            if (response.results[0]) {
              console.log(response.results[0].formatted_address)
              const haddrss = response.results[0].formatted_address
              setName(haddrss)
            }
          })
        }
      })
    }
  }

  useEffect(() => {
    initAutocomplete()
  })

  useEffect(() => {
    setTimeout(() => {
      nav()
    }, 3000)
  }, [])

  return (
    <>
      <div className={styles.resdiv}>
        <Row gutter={{ xs: 8, sm: 8, lg: 16 }}>
          <Col className='gutter-row' lg={18} md={24} sm={24} xs={24}>
            <Row>
              <Col lg={24} md={24} sm={24} xs={24}>
                <div className='para'>
                  {/* <Mapp handleKeyDown={handleKeyDown} /> */}
                  <div className='inp_div'>
                    <input
                      id='pac-input'
                      className='pac_target_input'
                      type='text'
                      placeholder='Search Location'
                      name='name'
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <button id='home' onClick={nav}>
                      <BiCurrentLocation />
                    </button>
                  </div>
                  {isLoaded ? (
                    <GoogleMap
                      options={options}
                      zoom={zoom}
                      mapContainerClassName='map_cont'
                      center={center}
                    >
                      <MarkerClusterer>
                        {(clusterer) =>
                          stores.map((shop) => (
                            <Marker
                              position={{
                                lat: Number(shop.lat),
                                lng: Number(shop.lng),
                              }}
                              key={shop.id}
                              clusterer={clusterer}
                              icon={{
                                url: "./location_dark.png",
                                scaledSize: new window.google.maps.Size(50, 50),
                                origin: new window.google.maps.Point(0, 0),
                                anchor: new window.google.maps.Point(25, 25),
                              }}
                              onClick={() => {
                                setlocation(shop)
                              }}
                            />
                          ))
                        }
                      </MarkerClusterer>
                      {selected ? (
                        <InfoWindow
                          position={{
                            lat: Number(selected.lat),
                            lng: Number(selected.lng),
                          }}
                          onCloseClick={() => {
                            setSelected(null)
                          }}
                        >
                          <div>
                            <p>{selected.name}</p>
                            <p>{selected.address}</p>
                            <p>
                              tel:
                              <a href={`tel: ${selected.tel}}`}>
                                {" "}
                                {selected.tel}
                              </a>
                            </p>
                          </div>
                        </InfoWindow>
                      ) : null}
                    </GoogleMap>
                  ) : (
                    <></>
                  )}
                </div>
              </Col>
            </Row>
          </Col>
          <Col className='gutter-row' lg={6} md={24} sm={24} xs={24}>
            <div className={styles.store_cont}>
              {shops.length === 0 ? (
                <div className={styles.store_list}>
                  <p>Search to find nearest stores.</p>
                </div>
              ) : (
                shops.map((e) => {
                  return (
                    <div
                      className={styles.store_listdiv}
                      onClick={() => {
                        searchlocation(Number(e.lat), Number(e.lng))
                      }}
                    >
                      <p>{e.name}</p>
                      <p>{e.address}</p>
                      <p>{e.country}</p>
                    </div>
                  )
                })
              )}
            </div>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default React.memo(MyComponent)
