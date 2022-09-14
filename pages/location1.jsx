import React, { useState, useEffect } from "react"
import { GoPrimitiveDot } from "react-icons/go"
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
  MarkerClusterer,
} from "@react-google-maps/api"
import styles from "../styles/Location/location.module.scss"
import { Col, Row } from "antd"
import { BiCurrentLocation, BiRightArrowAlt } from "react-icons/bi"

const options = {
  disableDefaultUI: true,
  zoomControl: true,
}
const stores = [
  // USA
  {
    id: 3,
    name: "Eye Catchers Optique",
    address: "318 East Palmetto Park Road,Boca Raton,FL 33432",
    tel: "+1 561.338.0081",
    country: "United States",
    lat: 26.350625060095226,
    lng: -80.081210871164,
  },
  {
    id: 4,
    name: "Oberti Luxury World",
    address: "51 NE 40th St,Miami, FL 33137",
    tel: "+1 786.431.5280",
    country: "United States",
    lat: 25.926050120386915,
    lng: -80.1552953363578,
  },

  {
    id: 1,
    name: "Optik USA",
    address: "3575 NE 207 St #B6A, Aventura, FL 33180",
    tel: "+1 305.354.2020",
    country: "United States",
    lat: 25.969048843744964,
    lng: -80.13027220584563,
  },
  {
    id: 2,
    name: "The Eyeglass Place",
    address: "430 South Dixie Highway, Coral Gables,FL 33146",
    tel: "+1 305.669.3890",
    country: "United States",
    lat: 25.725613534079642,
    lng: -80.26280903068287,
  },

  {
    id: 5,
    name: "Bustelo’s Optical",
    address: "11241 SW 40th St,Miami, FL 33165",
    tel: "+1 786.431.1625",
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
  // {
  //   id: 7,
  //   name: "Eyewear Candy Optical",
  //   address: "5062 W. Atlantic Ave. Delray Beach FL 33484",
  //   tel: "+1 (561) 404-8353",
  //   country: "United States",
  //   lat: 26.456915922442736,
  //   lng: -80.12435931534398,
  // },
  {
    id: 29,
    name: "Planet Optical",
    address: "10367 NW 41st St,Doral, FL 33178",
    tel: "+1 (305) 846-7778",
    country: "United States",
    lat: 25.81225230488456,
    lng: -80.36503918650605,
  },
  {
    id: 30,
    name: "Coral Eyes",
    address: "Coral Eyes 1353 Coral Way, Miami, FL  33145",
    tel: "+1 (305) 854-2388",
    country: "United States",
    lat: 25.75130232843454,
    lng: -80.21752310000001,
  },

  // Puerto Rico

  {
    id: 8,
    name: "Eyewear Shop",
    address: "The Market Place at Montehiedra  Local 4B San Juan PR 00926",
    tel: "+1 (787) 286-8001",
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
    tel: "+1 (787) 286-8001",
    phone: "+1 (787) 286-8802",
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
    tel: "+1 787-394-9990",
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
    lat: 18.21926576984875,
    lng: -66.22560685767073,
  },

  // Brazil

  {
    id: 14,
    name: "LENTESDELUXO",
    address:
      "SHIS Qi 28 CONJUNTO 6 CASA 12 LAGO SUL BRASÍLIA DF 71670260 BRASIL",
    tel: "+55 21991682522",
    country: "Brazil",
    lat: -15.814704279727808,
    lng: -47.81468779999999,
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
    tel: "+1 (784) 457-5000",
    country: "St Vincent and the Grenadines",
    lat: 13.139713166478865,
    lng: -61.195018457672,
  },

  // Uruguay

  {
    id: 18,
    name: "Óptica fornio",
    address: "José ellauri 657, Montevideo",
    tel: "+598 2711 3231",
    country: "Uruguay",
    lat: -34.91852917490241,
    lng: -56.155996073015984,
  },
  {
    id: 19,
    name: "Óptica Briozzo",
    address: "San José 1260, Montevideo",
    tel: "+598 2902 5051",
    country: "Uruguay",
    lat: -34.906613229589496,
    lng: -56.188870144176796,
  },
  {
    id: 20,
    name: "Enfoque Visión",
    address: "Av Brasil 2698, Montevideo",
    tel: "+598 2707 6006",
    country: "Uruguay",
    lat: -34.90830823985922,
    lng: -56.15594294417999,
  },

  // Israel

  {
    id: 21,
    name: "Belisima Optician",
    address: "Carlebach St 39, Tel Aviv-Yafo, Israel",
    phone: "+972 50-447-8355",
    tel: "+972 3-624-3555",
    country: "Israel",
    lat: 32.070559718250934,
    lng: 34.782387684655994,
  },
  {
    id: 22,
    name: "Belisima Optician",
    address: "Shmuel HaNatziv St 4, Netanya, Israel",
    tel: "+972 3-624-3555",
    country: "Israel",
    lat: 32.3292341165143,
    lng: 34.85674251349392,
  },
  {
    id: 23,
    name: "Belisima Optician",
    address: "Yosef Lishanski Blvd 9, Rishon LeTsiyon, Israel",
    tel: "+972 3-624-3555",
    country: "Israel",
    lat: 31.99020613945152,
    lng: 34.76459569815249,
  },
  {
    id: 24,
    name: "Belisima Optician",
    address: "Yoseftal St 92, Bat Yam, Israel",
    tel: "+972 3-624-3555",
    country: "Israel",
    lat: 32.01543286886161,
    lng: 34.756070740481775,
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
    lat: 40.63336901181343,
    lng: 22.94883121349393,
  },

  // Poland
  {
    id: 28,
    name: "OKULAROWNIA",
    address: "UL. JÓZEFA WYBICKIEGO 98/58 87-100 TORUŃ POLAND",
    tel: "+48 884 607 700",
    country: "Poland",
    lat: 53.02543863309232,
    lng: 18.590557286506073,
  },
]

const MyComponent = () => {
  const [libraries] = useState(["places"])
  // const mapref = useRef()
  const [name, setName] = useState("")
  // const [address, setAddress] = useState("")
  const [zoom, setZoom] = useState(2)
  // const [bounds, setBounds] = useState(null)

  const [selected, setSelected] = useState(null)
  const [noshop, setNoshop] = useState("Search to find nearest stores.")
  const [shops, setShops] = useState([])

  const [center, setCenter] = useState({
    lat: parseFloat(15.4542),
    lng: parseFloat(18.7322),
  })

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDsbaiwJKfNNSgsRiZBFkXdzxHnJTfcuRw",
    libraries: libraries,
  })

  const searchlocation = (latitude, longitude) => {
    setCenter({ lat: latitude, lng: longitude })
    setZoom(16)
  }

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

        // const val = stores.filter((shop) => shop.country == "Puerto Rico")
        // setShops(val)

        const geocoder = new google.maps.Geocoder()
        geocodeLatLng(geocoder)

        function geocodeLatLng(geocoder) {
          const latlng = { lat: pos.lat, lng: pos.lng }

          geocoder.geocode({ location: latlng }).then((response) => {
            if (response.results[0]) {
              const haddrss = response.results[0].formatted_address
              setName(haddrss)
            }
          })
        }
      })
    }
  }

  const initAutocomplete = () => {
    // Create the search box and link it to the UI element.
    const input = document.getElementById("pac-input")
    const searchBox = new google.maps.places.SearchBox(input)

    searchBox.addListener("places_changed", () => {
      const places = searchBox.getPlaces()

      // console.log(places)

      if (places.length !== 0) {
        var latitude = Number(places[0].geometry.location.lat())
        var longitude = Number(places[0].geometry.location.lng())

        var address = places[0].formatted_address
        // var new_address = places[0].address_components
        //   ? places[0].address_components[
        //       places[0].address_components.length - 1
        //     ].long_name
        //   : places[0].formatted_address

        var new_address = places[0].formatted_address
          ? places[0].formatted_address
          : places[0].address_components[
              places[0].address_components.length - 1
            ].long_name

        setName(address)
        const val = stores.filter((shop) => shop.country == new_address)
        // const val1 = stores.filter((shop) => shop.country == "Puerto Rico")
        // console.log("val", val)
        // val.length === 0 ? setNoshop("No Shop in this area") : setShops(val)

        if (val.length === 0) {
          setShops(val)
          setNoshop("No Shop in this area")
        } else {
          setShops(val)
        }
        setCenter({ lat: Number(latitude), lng: Number(longitude) })

        if (address == "Barbados" || "St Vincent and the Grenadines") {
          setZoom(9)
        } else {
          setZoom(6)
        }

        // console.log(places[0].geometry.viewport)
        // setBounds(places[0].geometry.viewport)
      }
    })
  }

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
                  <div className='inp_div'>
                    <input
                      id='pac-input'
                      className='pac_target_input'
                      type='text'
                      placeholder='Search Location'
                      name='name'
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      onFocus={initAutocomplete}
                      autoComplete='off'
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
                            <p className={styles.infodot}>
                              <GoPrimitiveDot />
                              {selected.address}
                            </p>
                            <p className={styles.tel}>
                              {selected.phone ? (
                                <>
                                  <div style={{ marginBottom: "5px" }}>
                                    <a href={`tel: ${selected.tel}}`}>
                                      {" "}
                                      {selected.tel}
                                    </a>
                                  </div>
                                  <div>
                                    <a href={`tel: ${selected.phone}}`}>
                                      {" "}
                                      {selected.phone}
                                    </a>
                                  </div>
                                </>
                              ) : (
                                <a href={`tel: ${selected.tel}}`}>
                                  {" "}
                                  {selected.tel}
                                </a>
                              )}
                            </p>
                            <a
                              className={styles.lead}
                              target='_blank'
                              href={`https://www.google.com/maps?daddr=@${selected.lat},${selected.lng}`}
                            >
                              <p>Directions</p>
                              <BiRightArrowAlt />
                            </a>
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
                  <p>{noshop}</p>
                </div>
              ) : (
                shops.map((e) => {
                  return (
                    <div
                      className={styles.store_listdiv}
                      onClick={() => {
                        searchlocation(Number(e.lat), Number(e.lng))
                      }}
                      key={e.id}
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
