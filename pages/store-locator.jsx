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
    mapLink:
      "https://www.google.com/maps/place/Eye+Catchers+Optique/@26.3504472,-80.0812216,15z/data=!4m2!3m1!1s0x0:0x629fc74b807ef659?sa=X&ved=2ahUKEwiTso_4t5f6AhXIHLkGHQq4BL0Q_BJ6BAg9EAU",
  },
  {
    id: 4,
    name: "Oberti Luxury World",
    address: "51 NE 40th St,Miami, FL 33137, EE. UU.",
    tel: "+1 786.431.5280",
    country: "United States",
    lat: 25.813787852521386,
    lng: -80.19446488650607,
    mapLink:
      "https://www.google.com/maps/place/Daniel+Oberti+Luxury+World/@25.8135802,-80.1944327,15z/data=!4m2!3m1!1s0x0:0x770ad470e17fd395?sa=X&ved=2ahUKEwjAjvfnt5f6AhUFIrkGHeLvAksQ_BJ6BAhAEAU",
  },

  {
    id: 1,
    name: "Optik USA",
    address: "3575 NE 207 St #B6A, Aventura, FL 33180",
    tel: "+1 305.354.2020",
    country: "United States",
    lat: 25.969048843744964,
    lng: -80.13027220584563,
    mapLink:
      "https://www.google.com/maps/place/Optik+USA/@25.9689154,-80.1301982,20.25z/data=!4m5!3m4!1s0x88d9ad32692f1ad9:0x6fa65582f71a00ad!8m2!3d25.9688616!4d-80.1302533",
  },
  {
    id: 2,
    name: "The Eyeglass Place",
    address: "430 South Dixie Highway, Coral Gables,FL 33146",
    tel: "+1 305.669.3890",
    country: "United States",
    lat: 25.725613534079642,
    lng: -80.26280903068287,
    mapLink:
      "https://www.google.com/maps/place/Eyeglass+Place+Inc/@25.7253574,-80.2627232,15z/data=!4m2!3m1!1s0x0:0xa2d41e9dc78a186c?sa=X&ved=2ahUKEwjapPfYt5f6AhXCHrkGHSZMCGgQ_BJ6BAheEAU",
  },

  {
    id: 5,
    name: "Bustelo’s Optical",
    address: "11241 SW 40th St,Miami, FL 33165",
    tel: "+1 786.431.1625",
    country: "United States",
    lat: 25.73437729734589,
    lng: -80.37646665767201,
    mapLink:
      "https://www.google.com/maps/place/Bustelo'+s+Optical/@25.7341985,-80.3764452,15z/data=!4m5!3m4!1s0x0:0x999768092f74816c!8m2!3d25.7341985!4d-80.3764452",
  },
  {
    id: 6,
    name: "Daluz Optical",
    address: "4528 W 12th Ave, Hialeah, FL 33012",
    tel: "+1 305-557-6777",
    country: "United States",
    lat: 25.863230990415992,
    lng: -80.30694577236908,
    mapLink:
      "https://www.google.com/maps/place/Daluz+Optical+%26+Supplies+Inc./@25.8631768,-80.3069443,15z/data=!4m2!3m1!1s0x0:0x9030fd6100ad199a?sa=X&ved=2ahUKEwi9mrG5t5f6AhUeLbkGHVr_ABUQ_BJ6BAgrEAU",
  },
  {
    id: 29,
    name: "Planet Optical",
    address: "10367 NW 41st St,Doral, FL 33178",
    tel: "+1 (305) 846-7778",
    country: "United States",
    lat: 25.81225230488456,
    lng: -80.36503918650605,
    mapLink:
      "https://www.google.com/maps/place/Planet+Optical/@25.8121026,-80.365007,15z/data=!4m5!3m4!1s0x0:0xa6c4d9cc5581d281!8m2!3d25.8120132!4d-80.3650074",
  },
  {
    id: 30,
    name: "Coral Eyes",
    address: "Coral Eyes 1353 Coral Way, Miami, FL  33145",
    tel: "+1 (305) 854-2388",
    country: "United States",
    lat: 25.75130232843454,
    lng: -80.21752310000001,
    mapLink:
      "https://www.google.com/maps/place/CORAL+EYES/@25.7511912,-80.2175231,15z/data=!4m5!3m4!1s0x0:0xcf4fb35b3ac46789!8m2!3d25.7511534!4d-80.2175223",
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
    mapLink:
      "https://www.google.com/maps/place/Eyewear+Shop/@18.3365524,-66.0694526,15z/data=!4m5!3m4!1s0x0:0x4758c31441dc4048!8m2!3d18.3365524!4d-66.0694526",
  },
  {
    id: 9,
    name: "Clinica Visual Aguadilla",
    address: "Carr. 107, Aguadilla, Puerto Rico",
    tel: "+1 787 891 4400",
    country: "Puerto Rico",
    lat: 18.446171129063842,
    lng: -67.14775951534399,
    mapLink:
      "https://www.google.com/maps/place/Cl%C3%ADnica+Visual+Dr.+Jorge+Luis+Malav%C3%A9+P%C3%A9rez/@18.4459116,-67.1477166,15z/data=!4m2!3m1!1s0x0:0xda75d4f5f6fda32b?sa=X&ved=2ahUKEwjt_oe2uZf6AhVYuZUCHZ32BSEQ_BJ6BAg5EAU",
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
    mapLink:
      "https://www.google.com/maps/place/C%C3%A0tala+Eye+Care+LLC/@18.2089274,-66.1041325,15z/data=!4m2!3m1!1s0x0:0xbd0f611775f51a93?sa=X&ved=2ahUKEwisuOXbuZf6AhU9u5UCHarUDPcQ_BJ6BAg1EAU",
  },
  {
    id: 11,
    name: "Bright Vision Optometry",
    address: "Carr. 115 Asomante, Aguada, Puerto Rico",
    tel: "+1 787-589-7468",
    country: "Puerto Rico",
    lat: 18.38564867965309,
    lng: -67.17752860325392,
    mapLink:
      "https://www.google.com/maps/place/Bright+Vision+Optometry/@18.3853738,-67.1775286,15z/data=!4m2!3m1!1s0x0:0x89f91bd570a9498d?sa=X&ved=2ahUKEwijysCEupf6AhWjqpUCHWqtDG0Q_BJ6BAg7EAU",
  },
  {
    id: 12,
    name: "Anteojos Di Moda",
    address: "Metro Plaza, Caguas, Puerto Rico 00725",
    tel: "+1 787-394-9990",
    country: "Puerto Rico",
    lat: 18.244531645929158,
    lng: -66.03972827442006,
    mapLink:
      "https://www.google.com/maps/place/Anteojos+Di+Moda+Optica/@18.2442973,-66.039739,15z/data=!4m5!3m4!1s0x0:0x5ff4c8ec27fc59e6!8m2!3d18.2442973!4d-66.039739",
  },
  {
    id: 13,
    name: "Tu Vision Optika",
    address: "Calle Georgetti 38, Comerio 00782, Puerto Rico",
    tel: "+1 787 693 3283",
    country: "Puerto Rico",
    lat: 18.21926576984875,
    lng: -66.22560685767073,
    mapLink:
      "https://www.google.com/maps/place/38+Cll+Georgetti,+Comer%C3%ADo,+00782,+Puerto+Rico/@18.2190059,-66.2255854,17z/data=!3m1!4b1!4m5!3m4!1s0x8c0347f2baaebf2b:0x8bf9bc9b4008fc5c!8m2!3d18.219005!4d-66.225585",
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
    mapLink:
      "https://www.google.com/maps/place/Shis+Qi+28+Conjunto+6+-+St.+de+Habita%C3%A7%C3%B5es+Individuais+Sul+QI+28+Conj.+6+-+Lago+Sul,+Bras%C3%ADlia+-+DF,+70297-400,+Brasil/@-15.8150088,-47.8146878,17z/data=!3m1!4b1!4m5!3m4!1s0x935a233b646c6227:0xd18a1fdc9851ff1e!8m2!3d-15.8150088!4d-47.8146878",
  },

  // Barbados
  {
    id: 16,
    name: "Insight Optical",
    address: "James Fort Building, Hincks St, Bridgetown, Barbados",
    tel: "+1 246-426-9970",
    country: "Barbados",
    lat: 13.09706731907493,
    lng: -59.6190027,
    mapLink:
      "https://www.google.com/maps/place/Insight+Optical/@13.0968113,-59.6190027,15z/data=!4m2!3m1!1s0x0:0xac579b9dc1dddf8b?sa=X&ved=2ahUKEwiZg7Phu5f6AhVxppUCHTiyCfQQ_BJ6BAhMEAU",
  },

  {
    id: 15,
    name: "Belleville Optical",
    address: "#7 Chelwood 8th Avenue, Belleville St.Michael Barbados",
    tel: "+1 246 437 3564",
    country: "Barbados",
    lat: 13.09814,
    lng: -59.60203,
    mapLink:
      "https://www.google.com/maps/place/Belleville+Optical+Inc/@13.0981458,-59.6020317,15z/data=!4m5!3m4!1s0x0:0x73130ae376d097ed!8m2!3d13.0981913!4d-59.6020293",
  },

  // St. Vincent & the Grenadines

  {
    id: 17,
    name: "OSV GROUP",
    address:
      "Glen Road, Calliaqua, Saint George VC VC0274, Calliaqua, St. Vincent & The Grenadines",
    tel: "+1 784-457-5000",
    country: "St Vincent and the Grenadines",
    lat: 13.139713166478865,
    lng: -61.195018457672,
    mapLink:
      "https://www.google.com/maps/place/OSV+Group+Inc/@13.1394154,-61.194997,15z/data=!4m5!3m4!1s0x0:0x6fbea816a2a09a17!8m2!3d13.1394154!4d-61.194997",
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
    mapLink:
      "https://www.google.com/maps/place/%C3%93PTICA+FORNIO/@-34.9187711,-56.1559317,15z/data=!4m5!3m4!1s0x0:0xba57691aac367b23!8m2!3d-34.9187711!4d-56.1559317",
  },
  {
    id: 19,
    name: "Óptica Briozzo",
    address: "San José 1260, Montevideo",
    tel: "+598 2902 5051",
    country: "Uruguay",
    lat: -34.906613229589496,
    lng: -56.188870144176796,
    mapLink:
      "https://www.google.com/maps/place/Optica+Briozzo/@-34.9067862,-56.1888172,15z/data=!4m5!3m4!1s0x0:0xc2a74956410921a!8m2!3d-34.9067913!4d-56.1889216",
  },
  {
    id: 20,
    name: "Enfoque Visión",
    address: "Av Brasil 2698, Montevideo",
    tel: "+598 2707 6006",
    country: "Uruguay",
    lat: -34.90830823985922,
    lng: -56.15594294417999,
    mapLink:
      "https://www.google.com/maps/place/Enfoque+Visi%C3%B3n/@-34.9085238,-56.1558893,15z/data=!4m2!3m1!1s0x0:0x2e7a9e5bee2d505d?sa=X&ved=2ahUKEwiKmZbxvJf6AhWvkZUCHeWhDqIQ_BJ6BAg5EAU",
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
    mapLink:
      "https://www.google.com/maps/place/Belisima+Optician/@32.0703097,34.7824306,15z/data=!4m5!3m4!1s0x0:0x7cb741e62a118318!8m2!3d32.0703175!4d34.7824568",
  },
  {
    id: 22,
    name: "Belisima Optician",
    address: "Shmuel HaNatziv St 4, Netanya, Israel",
    tel: "+972 50-447-8355",
    country: "Israel",
    lat: 32.3292341165143,
    lng: 34.85674251349392,
    mapLink:
      "https://www.google.com/maps/place/Belisima/@32.3290664,34.8567747,15z/data=!4m5!3m4!1s0x0:0x1b88e88ec1e96169!8m2!3d32.3290664!4d34.8567747",
  },
  {
    id: 23,
    name: "Belisima Optician",
    address: "Yosef Lishanski Blvd 9, Rishon LeTsiyon, Israel",
    tel: "+972 50-447-8355",
    country: "Israel",
    lat: 31.99020613945152,
    lng: 34.76459569815249,
    mapLink:
      "https://www.google.com/maps/place/%D7%90%D7%95%D7%A4%D7%98%D7%99%D7%A7%D7%94+%D7%91%D7%9C%D7%99%D7%A1%D7%99%D7%9E%D7%94%E2%80%AD/@31.9903735,34.7647496,15z/data=!4m5!3m4!1s0x0:0x22cf4d8a1f1f4391!8m2!3d31.9903735!4d34.7647496",
  },
  {
    id: 24,
    name: "Belisima Optician",
    address: "Yoseftal St 92, Bat Yam, Israel",
    tel: "+972 50-447-8355",
    country: "Israel",
    lat: 32.01543286886161,
    lng: 34.756070740481775,
    mapLink:
      "https://www.google.com/maps/place/Yoseftal+92,+Bat+Yam,+Israel/@32.0151827,34.7561673,17z/data=!3m1!4b1!4m5!3m4!1s0x1502b36b9bd64bd3:0x61f9b60ba5ee17ba!8m2!3d32.0151827!4d34.7561673",
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
    mapLink:
      "https://www.google.com/maps/place/Neu/@35.3144007,139.5454826,15z/data=!4m2!3m1!1s0x0:0x83f0f13f4ee30b73?sa=X&ved=2ahUKEwj_88a0vpf6AhXRpZUCHVEoC1YQ_BJ6BAhdEAU",
  },

  // Greece

  {
    id: 26,
    name: "OPTIC SHOP",
    address: "Leof. Irinis 42, Ilioupoli 163 45,Greece",
    tel: "+30 21 0991 8722",
    country: "Greece",
    lat: 37.933533524698554,
    lng: 23.756065099999997,
    mapLink:
      "https://www.google.com/maps/place/OPTIC+SHOP/@37.9333939,23.7560651,15z/data=!4m2!3m1!1s0x0:0x668c79ce57bfbb57?sa=X&ved=2ahUKEwiBiKvuvpf6AhWbRLgEHeIKAJYQ_BJ6BAgbEAU",
  },
  {
    id: 27,
    name: "Optika Garifallou",
    address: "Egnatia 124, Thessaloniki 546 22, Greece",
    tel: "+30 231 024 2007",
    country: "Greece",
    lat: 40.63336901181343,
    lng: 22.94883121349393,
    mapLink:
      "https://www.google.com/maps/place/%CE%9F%CF%80%CF%84%CE%B9%CE%BA%CE%AC+%CE%93%CE%B1%CF%81%CF%85%CF%86%CE%AC%CE%BB%CE%BB%CE%BF%CF%85/@40.6332489,22.9488904,15z/data=!4m2!3m1!1s0x0:0xd50afc008a05a36f?sa=X&ved=2ahUKEwi1kfSBv5f6AhU4qJUCHZCAC3sQ_BJ6BAggEAU",
  },

  // Poland
  {
    id: 28,
    name: "OKULAROWNIA TORUŃ",
    address: "UL. JÓZEFA WYBICKIEGO 98/58 87-100 TORUŃ POLAND",
    tel: "+48 884 607 700",
    country: "Poland",
    lat: 53.02543863309232,
    lng: 18.590557286506073,
    mapLink:
      "https://www.google.com/maps/place/Okularownia+Toru%C5%84/@53.0253405,18.5905301,15z/data=!4m5!3m4!1s0x0:0x7d7a7816c32f8431!8m2!3d53.0253405!4d18.5905301",
  },

  // Denmark
  {
    id: 31,
    name: "Brilleværk",
    address: "Elmegade 3, 2200 København N",
    tel: "+45 3152 5120",
    country: "Denmark",
    lat: 55.689811559730212,
    lng: 12.557659684658566,
    mapLink:
      "https://www.google.com/maps/place/Brillev%C3%A6rk/@55.6894608,12.5577026,15z/data=!4m5!3m4!1s0x0:0xfef2fe671bcc14fc!8m2!3d55.6894608!4d12.5577026",
  },

  // Kenya

  {
    id: 32,
    name: "Eyecare Consultants",
    address: "ABC Place Nairobi Waiyaki Way, Nairobi, Kenya",
    tel: "+254 722 733 000",
    phone: "+254 733 698 751",
    country: "Kenya",
    lat: -1.258783780522897,
    lng: 36.776967723267674,
    mapLink:
      "https://www.google.com/maps/place/Eyecare+Consultants+LTD/@-1.2598135,36.7771823,15z/data=!4m5!3m4!1s0x0:0xf7829fec12d76ce!8m2!3d-1.2598135!4d36.7771823",
  },
  {
    id: 33,
    name: "Eyecare Consultants",
    address: "Eco Bank Towers, Muindi Mbingu St, Nairobi, Kenya",
    tel: "+254 733 698 752",
    phone: "+254 722 908 703",
    country: "Kenya",
    lat: -1.2852907137573197,
    lng: 36.82118719207879,
    mapLink:
      "https://www.google.com/maps/place/Eyecare+Consultants+Ltd/@-1.2861059,36.8209297,15z/data=!4m5!3m4!1s0x0:0x5333920164fbe7a6!8m2!3d-1.2861059!4d36.8209297",
  },
  {
    id: 34,
    name: "The Eye Room Opticians",
    address: "Yaya Centre Argwings Kodhek Rd, Nairobi, Kenya",
    tel: "+254 711 884 893",
    phone: "+254 782 337 424",
    country: "Kenya",
    lat: -1.291696306960724,
    lng: 36.788010646039396,
    mapLink:
      "https://www.google.com/maps/place/The+Eye+Room+Opticians+%7C+Fashionable+eyewear+in+Kenya/@-1.2925973,36.7878819,15z/data=!4m2!3m1!1s0x0:0x8366f2e433d61935?sa=X&ved=2ahUKEwj3s7adrrX6AhWXBhoKHXjnBeMQ_BJ6BAhHEAU",
  },

  // USA

  {
    id: 35,
    name: "Winthrop Eye Center",
    address: "42 Woodside Ave, Winthrop, MA 02152, United States",
    tel: "+1 617-213-2131",
    country: "United States",
    lat: 42.37536564689758,
    lng: -70.98675548465354,
    mapLink:
      "https://www.google.com/maps/place/Winthrop+Eye+Center/@42.3749535,-70.9867984,15z/data=!4m5!3m4!1s0x0:0x1ced1eaf749bb07e!8m2!3d42.3749535!4d-70.9867984?hl=en-US",
  },
]

const MyComponent = () => {
  const [libraries] = useState(["places"])
  const [name, setName] = useState("")
  const [zoom, setZoom] = useState(2)
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

  const findCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }

        setCenter({ lat: Number(pos.lat), lng: Number(pos.lng) })
        setZoom(4)

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

      if (places.length !== 0) {
        var latitude = Number(places[0].geometry.location.lat())
        var longitude = Number(places[0].geometry.location.lng())

        var address = places[0].formatted_address

        var new_address = places[0].formatted_address
          ? places[0].formatted_address
          : places[0].address_components[
              places[0].address_components.length - 1
            ].long_name

        setName(address)
        const val = stores.filter((shop) => shop.country == new_address)

        if (val.length === 0) {
          setShops(val)
          setNoshop("No Shop in this area")
        } else {
          setShops(val)
        }
        setCenter({ lat: Number(latitude), lng: Number(longitude) })

        if (
          address == "Barbados" ||
          address == "St Vincent and the Grenadines"
        ) {
          setZoom(9)
        } else {
          setZoom(4)
        }
      }
    })
  }

  useEffect(() => {
    setTimeout(() => {
      findCurrentLocation()
      initAutocomplete()
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
                      autoComplete='off'
                    />
                    <button id='home' onClick={findCurrentLocation}>
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
                              href={selected.mapLink}
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

export default MyComponent
