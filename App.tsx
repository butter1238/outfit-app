// App.js
import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import HomeScreen from './screens/HomeScreen'
import ExploreScreen from './screens/ExploreScreen'

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const SPACING = 10;
const CARD_RADIUS = 16;
const NUM_COLUMNS = 2;
const CARD_MARGIN = SPACING * 1.5;
const CARD_WIDTH =
  (SCREEN_WIDTH - CARD_MARGIN * (NUM_COLUMNS + 1)) / NUM_COLUMNS;



/* -----------------------
   Mock data (kept small & consistent)
   ----------------------- */
const MOCK_ITEMS = [
  {
    id: "1",
    title: "Cotton T-Shirt",
    subtitle: "White Casual",
    subtitleIcon: "https://cdn-icons-png.flaticon.com/512/2287/2287997.png", // t-shirt icon
    category: "Clothing",
    image: "https://images.pexels.com/photos/991509/pexels-photo-991509.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
   {
    id: "2",
    title: "Bookshelf",
    subtitle: "Walnut Wood",
    subtitleIcon: "https://cdn-icons-png.flaticon.com/512/2997/2997933.png", // bookshelf icon
    category: "Furniture",
    image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: "3",
    title: "Wooden Coffee Table",
    subtitle: "Minimalist Design",
    subtitleIcon: "https://cdn-icons-png.flaticon.com/512/3048/3048122.png", // table icon
    category: "Furniture",
    image: "https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: "4",
    title: "Silk Scarf",
    subtitle: "Red Floral",
    subtitleIcon: "https://cdn-icons-png.flaticon.com/512/2921/2921853.png", // scarf icon
    category: "Accessory",
    image: "https://images.pexels.com/photos/375880/pexels-photo-375880.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: "5",
    title: "Denim Jeans",
    subtitle: "Blue Slim Fit",
    subtitleIcon: "https://cdn-icons-png.flaticon.com/512/814/814513.png", // jeans icon
    category: "Clothing",
    image: "https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: "6",
    title: "Desk Lamp",
    subtitle: "Gold Modern",
    subtitleIcon: "https://cdn-icons-png.flaticon.com/512/1480/1480698.png", // lamp icon
    category: "Furniture",
    image: "https://images.pexels.com/photos/4792627/pexels-photo-4792627.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: "7",
    title: "Silver Bracelet",
    subtitle: "Minimalist Charm",
    subtitleIcon: "https://cdn-icons-png.flaticon.com/512/2933/2933999.png", // bracelet icon
    category: "Accessory",
    image: "https://images.pexels.com/photos/266621/pexels-photo-266621.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: "8",
    title: "Wool Coat",
    subtitle: "Black Elegant",
    subtitleIcon: "https://cdn-icons-png.flaticon.com/512/599/599388.png", // coat icon
    category: "Clothing",
    image: "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: "9",
    title: "Velvet Sofa",
    subtitle: "Navy Blue",
    subtitleIcon: "https://cdn-icons-png.flaticon.com/512/638/638077.png", // sofa icon
    category: "Furniture",
    image: "https://images.pexels.com/photos/276583/pexels-photo-276583.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: "10",
    title: "Round Sunglasses",
    subtitle: "Black Retro",
    subtitleIcon: "https://cdn-icons-png.flaticon.com/512/414/414927.png", // sunglasses icon
    category: "Accessory",
    image: "https://images.pexels.com/photos/343720/pexels-photo-343720.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  
  ];



const MOCK_COLLECTIONS = [
  {
    id: "c1",
    title: "Work Capsule",
    tags: ["Work", "Minimal"],
    parts: [
      "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.unsplash.com/photo-1524253482453-3fed8d2fe12b?w=800"
    ],
  },
  {
    id: "c2",
    title: "Leisure Set",
    tags: ["Leisure", "Boho"],
    parts: [
      "https://images.unsplash.com/photo-1524253482453-3fed8d2fe12b?w=800",
      "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=800",
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800",
    ],
  },
  {
    id: "c3",
    title: "Evening Edit",
    tags: ["Night", "Elegant"],
    parts: [
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800", // Elegant evening gown
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800", // Nighttime chic
      "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?q=80&w=435&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"  // Classy evening style
    ],
  },
  {
    id: "c4",
    title: "Street Style",
    tags: ["Casual", "Urban"],
    parts: [
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=800", // Urban streetwear
      "https://imgs.search.brave.com/zZI_gdMvVG-HIGyd0ONpBqFhrCYuqHPxdWp9fPPGIAA/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9tZW4tcy1icm93/bi1sZWF0aGVyLXNo/b2VzLXdpdGgtc2hv/ZWxhY2VzLWRhcmst/d29vZGVuLWJhY2tn/cm91bmRfNzcxOTAt/NTMyLmpwZz9zZW10/PWFpc19oeWJyaWQm/dz03NDAmcT04MA", // Casual city vibe
      "https://imgs.search.brave.com/ILuxLnMlqhZX1OPrRAFnjeq9ClH4AfrfGJX2LDXdcJE/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNjgz/NTYxMjAyL3Bob3Rv/L3NuZWFrZXJzLWFu/ZC1idXNpbmVzcy1z/aG9lcy1mYWNlLXRv/LWZhY2Utb24tYXNw/aGFsdC13b3JrLWxp/ZmUtYmFsYW5jZS1j/b25jZXB0LmpwZz9z/PTYxMng2MTImdz0w/Jms9MjAmYz1Db1JW/RUFyUlBIcUM5WTZE/dGhDMHMyVWNmQURI/YndCZXZmblFqMWJ6/SlZnPQ"  // Modern street style
    ],
  },
  {
    id: "c5",
    title: "Summer Vibes",
    tags: ["Summer", "Trendy"],
    parts: [
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800",
      "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=800",
      "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=800",
    ],
  },
  {
    id: "c6",
    title: "Winter Warmth",
    tags: ["Winter", "Cozy"],
    parts: [
      "https://imgs.search.brave.com/JWqVo70Mlq_cpR52M8QaGGAL9yhzjEyyL9vHrO5El7s/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NTExNU9sYmwyS0wu/anBn", // Cozy winter coat
      "https://imgs.search.brave.com/q_wNeDCdISyjYoSpv9eFfirzEH45LLmwgGSrDdsCEWE/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5ib29ob28uY29t/L2kvYm9vaG9vL2Jt/bTY3ODk2X2JsYWNr/X3hsL21hbGUtYmxh/Y2stbWFuLXNraS1n/b29nbGVzLz93PTkw/MCZxbHQ9ZGVmYXVs/dCZmbXQuanAyLnFs/dD03MCZmbXQ9YXV0/byZzbT1maXQ", // Warm layered outfit
      "https://imgs.search.brave.com/sPw3ZaVHfBdqQB9mWyOb4flcbjXYXXfKoSWxJ5-48mQ/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9ydWtt/aW5pbTIuZmxpeGNh/cnQuY29tL2ltYWdl/LzYxMi82MTIveGlm/MHEvc3VuZ2xhc3Mv/Ny9tL20vbS02MDkw/LXNpbmdsZS1zaGVl/dC1ibGFjay1waXJh/c28tb3JpZ2luYWwt/aW1hZ2tma2ZwZXpr/Z3JoeC5qcGVnP3E9/NzA"  // Winter knitwear
    ],
  },
  {
    id: "c7",
    title: "Beach Ready",
    tags: ["Beach", "Relax"],
    parts: [
      "https://imgs.search.brave.com/QB7D_zPFD_chQ2Uep4hudKE7tVG3YLTrwJEzYk3OdGY/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9maXJh/bmdpeWFybi5jb20v/Y2RuL3Nob3AvZmls/ZXMvQ0lHMDA1OTlf/ZDMzYjIzYTMtOGRk/My00ZjJjLWFkYTAt/MTg3YTRkYTNmZDkw/LmpwZz92PTE3NTUx/OTU4MTcmd2lkdGg9/MjY2Nw", // Relaxed beach look
      "https://images.unsplash.com/photo-1501426026826-31c667bdf23d?w=800", // Beachwear
      "https://imgs.search.brave.com/O8-OSYCGUZtcfgSAXV97cOB3z5pecRPn1kt4OPxxsSg/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jdXlh/bmEuY29tL2Nkbi9z/aG9wL2ZpbGVzL0F1/Z3VzdF9CYWdzX1BM/UF8wMS5qcGc_dj0x/NzUzOTA1NzQwJndp/ZHRoPTEwMjQ"  // Coastal summer vibe
    ],
  },
  {
    id: "c8",
    title: "Gym Kit",
    tags: ["Sport", "Active"],
    parts: [
      "https://images.unsplash.com/photo-1519336555923-59661f41bb45?w=800", // Activewear in action
      "https://imgs.search.brave.com/HTtZEF9ZU-2T_nN0BWmHWA60z9_xQ4awDkEwFZnK8H4/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMucGV4ZWxzLmNv/bS9waG90b3MvMzA2/MDI1Ny9wZXhlbHMt/cGhvdG8tMzA2MDI1/Ny5qcGVnP2F1dG89/Y29tcHJlc3MmY3M9/dGlueXNyZ2ImZHBy/PTEmdz01MDA", // Gym fitness outfit
      "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800"  // Sporty gear
    ],
  },
  {
    id: "c9",
    title: "Festival Fit",
    tags: ["Festival", "Bold"],
    parts: [
      "https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?w=800", // Bold festival attire
      "https://imgs.search.brave.com/lLyPPNRnG1_gahUYHb4wAqggRhXTnQHG-qbZ_9TGCuo/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTkw/NTEwNjE1OC9waG90/by9nZW50bGVtYW5z/LXdhcmRyb2JlLWZ1/bGwtb2Ytc2hpcnRz/LXN1aXRzLWFuZC10/aWVzLmpwZz9zPTYx/Mng2MTImdz0wJms9/MjAmYz1sVVJ2UGZs/TC1PSl9mM1QtbzdI/WW16b19fZWcwcjFN/bnVheW9wY0ZBRFZ3/PQ", // Vibrant festival outfit
      "https://imgs.search.brave.com/_afhBoSmskJRniqbVvUNE4xRdXInj2kEeQ5B7NeWb4s/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NzFoNFhBVW44UEwu/anBn"  // Colorful festival look
    ],
  },
  {
    id: "c10",
    title: "Date Night",
    tags: ["Romantic", "Elegant"],
    parts: [
      "https://imgs.search.brave.com/oBP8TL38XblCWXsqR8srOetK3ZSvSt4hDn170xZkpzo/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTMy/NjEwOTI1NC9waG90/by9ibGFjay1hbmQt/Ymx1ZS1tZW5zLXNh/bmRhbHMtd2Fsa2lu/Zy1vbi10aGUtYmVh/Y2gtaW4tc3VtbWVy/LXZhY2F0aW9uLXRp/bWUuanBnP3M9NjEy/eDYxMiZ3PTAmaz0y/MCZjPWJoWjBOUko3/U0VFUHNWV3NfdTlL/RUwtcExFaUc2VXJz/azhXYy0wbloxbG89", // Romantic evening look
      "https://imgs.search.brave.com/ICzGxuKYCIqFCFKcXsgfiuA61bqQjQLz8P8wSK_WocQ/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzUxL2Jh/LzkxLzUxYmE5MWIx/MTFjMDhkODc5Yjc4/NjdmMTYwYTkyNjhl/LmpwZw", // Elegant date outfit
      "https://imgs.search.brave.com/PCLhVmYNRoMhXjdSFXQj7RgotPINcZS-mleUKWG_Zkk/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAxLzE5Lzg4LzE4/LzM2MF9GXzExOTg4/MTg2Ml8zenBIUkJS/dlZPZ0l5Q1NTTk9z/bWpORzBieFZEZ2tz/YS5qcGc"  // Classy romantic style
    ],
  },
  
  
  
];

 

const MOCK_OUTFITS = [
  {
    id: 'o1',
    title: 'Casual Friday',
    tags: ['Casual', 'Streetwear'],
    parts: [
      { role: 'top', image: 'https://imgs.search.brave.com/RAXhB0alBKpO7HvpPugfDAf12Rj6sRyEdwNIB82Qm2E/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NDFOTGpSMVRmYUwu/anBn' },
      { role: 'bottom', image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1080' },
      { role: 'footwear', image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=1080' },
    ],
  },
  {
    id: 'o2',
    title: 'Evening Out',
    tags: ['Elegant', 'Night'],
    parts: [
      { role: 'top', image: 'https://imgs.search.brave.com/khw3My4gF73BRlh1fuRYEVJt5T_T1Rt7nQsirmQfrFM/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NzFMWGthb3NuSkwu/anBn' },
      { role: 'bottom', image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1080' },
      { role: 'outerwear', image: 'https://images.unsplash.com/photo-1517832207067-4db24a2ae47c?q=80&w=1080' },
    ],
  },
  {
    id: 'o3',
    title: 'Business Casual',
    tags: ['Professional', 'Office'],
    parts: [
      { role: 'top', image: 'https://media.istockphoto.com/id/486592060/photo/indian-jewellery.jpg?s=1024x1024&w=is&k=20&c=0NSdGgCaHV43enNxcrqG2lSKR71ZaY8GgMsI63dyuls=' },
      { role: 'footwear', image: 'https://imgs.search.brave.com/aCMr5m3akODWL7g1qkcReWyPV7q8iqlztnVTaMC-QM8/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMtbmEuc3NsLWlt/YWdlcy1hbWF6b24u/Y29tL2ltYWdlcy9J/LzYxdU9rQ1Y0dklM/LmpwZw' },
      { role: 'outerwear', image: 'https://imgs.search.brave.com/b_4-jYWi0NZpdvnS8aokhHnoLpZ-f5Pe_l9SSEYkoaI/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMtcGxhdGZvcm0u/OTlzdGF0aWMuY29t/Ly8xT0pHTnJzZ0J0/N29oODBISXluQkFQ/cG0yNVU9LzIyOHgy/OTA6MTM4OHgxNDUw/L2ZpdC1pbi81MDB4/NTAwLzk5ZGVzaWdu/cy1jb250ZXN0cy1h/dHRhY2htZW50cy8x/MTMvMTEzODU2L2F0/dGFjaG1lbnRfMTEz/ODU2NjMz' },
    ],
  },
  {
    id: 'o4',
    title: 'Weekend Getaway',
    tags: ['Casual', 'Travel'],
    parts: [
      { role: 'top', image: 'https://imgs.search.brave.com/J7eZtSCB4tyBzLM-9gWTVgwrqbG8W9LZoLhcBI42khE/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NDFiRTZ6TzRxbUwu/anBn' },
      { role: 'bottom', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1080' },
      { role: 'footwear', image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=1080' },
      { role: 'outerwear', image: 'https://images.unsplash.com/photo-1514989940723-e8e51635b782?q=80&w=1080' },
    ],
  },
  {
    id: 'o5',
    title: 'Summer Vibes',
    tags: ['Casual', 'Beach'],
    parts: [
      { role: 'top', image: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?q=80&w=1080' },
      { role: 'bottom', image: 'https://imgs.search.brave.com/2M_XJgn-f2EW4yqXGrxMCN3WNQatTyMllXAnT1zC3A4/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pNS53/YWxtYXJ0aW1hZ2Vz/LmNvbS9zZW8vTkVM/RVVTLVdvbWVucy0y/LWluLTEtV29ya291/dC1Zb2dhLVNob3J0/cy1mb3ItQXRobGV0/aWMtR3ltLVJ1bm5p/bmctQ2FzdWFsLVN1/bW1lci1TaG9ydC13/aXRoLVBvY2tldC1O/YXZ5LUJsdWUtVVMt/U2l6ZS1MX2U1ZGUy/YzhhLWI4MmUtNDg5/MS05NzI2LTkwYWJk/MzljM2MxMy5kYTUz/MGM2YzFiNjNhODMx/MGVlNzZiOWFhMGE3/ODhmZC5qcGVnP29k/bkhlaWdodD03ODQm/b2RuV2lkdGg9NTgw/Jm9kbkJnPUZGRkZG/Rg' },
      { role: 'footwear', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1080' },
    ],
  },
 {
    "id": "o6",
    "title": "Urban Explorer",
    "tags": ["Casual", "Streetwear"],
    "parts": [
      { "role": "top", "image": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1080" },
      { "role": "bottom", "image": "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1080" },
      { "role": "footwear", "image": "https://imgs.search.brave.com/e7zbxFnK6C4BaYn9QEKwnUqkZuvRJS3mOuNpO7yPf7Q/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudGhjZG4uY29t/L3Byb2R1Y3RpbWcv/OTYwLzk2MC8xNTYw/MzYzOC0yMTg1MjEw/ODMyMjczMjg1Lmpw/Zw" },
    ]
  },
{
  "id": "o7",
  "title": "Formal Night",
  "tags": ["Formal", "Evening"],
  "parts": [
    { "role": "top", "image": "https://images.unsplash.com/photo-1580654712603-eb43273aff33?q=80&w=1080" },
    { "role": "bottom", "image": "https://imgs.search.brave.com/luelOabUTJfbzncNYCwYf-dFWQu_Pz8VkTaUe4Y_EFk/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90aGV2/aWxsYWdlcmV0YWls/LmNvbS9jZG4vc2hv/cC9jb2xsZWN0aW9u/cy93b21lbi1qZXdl/bHJ5LW5hdmlnYXRp/b24tNTQyNzc1Lmpw/Zz92PTE3MDY1NTgy/NjAmd2lkdGg9MTA4/MA" },
    { "role": "outerwear", "image": "https://imgs.search.brave.com/0u9MmVFsr_hW3KPaTwPeZfOkVkKa4bk8TSkotQbcadQ/rs:fit:0:180:1:0/g:ce/aHR0cHM6Ly9pbWFn/ZS5zaHV0dGVyc3Rv/Y2suY29tL2ltYWdl/LXBob3RvL3lvdW5n/LXdvbWFuLXNpdHRp/bmctY2FyLWRyaXZl/cnMtMTAwbnctMjI2/NDcyNzM2MS5qcGc" }
  ]
},
  {
    id: 'o8',
    title: 'Office Chic',
    tags: ['Professional', 'Office'],
    parts: [
      { role: 'top', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1080' },
      { role: 'bottom', image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1080' },
      { role: 'footwear', image: 'https://images.unsplash.com/photo-1580654712603-eb43273aff33?q=80&w=1080' },
    ],
  },
  {
    id: 'o9',
    title: 'Beach Day',
    tags: ['Casual', 'Beach'],
    parts: [
      { role: 'top', image: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?q=80&w=1080' },
      { role: 'bottom', image: 'https://imgs.search.brave.com/2M_XJgn-f2EW4yqXGrxMCN3WNQatTyMllXAnT1zC3A4/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pNS53/YWxtYXJ0aW1hZ2Vz/LmNvbS9zZW8vTkVM/RVVTLVdvbWVucy0y/LWluLTEtV29ya291/dC1Zb2dhLVNob3J0/cy1mb3ItQXRobGV0/aWMtR3ltLVJ1bm5p/bmctQ2FzdWFsLVN1/bW1lci1TaG9ydC13/aXRoLVBvY2tldC1O/YXZ5LUJsdWUtVVMt/U2l6ZS1MX2U1ZGUy/YzhhLWI4MmUtNDg5/MS05NzI2LTkwYWJk/MzljM2MxMy5kYTUz/MGM2YzFiNjNhODMx/MGVlNzZiOWFhMGE3/ODhmZC5qcGVnP29k/bkhlaWdodD03ODQm/b2RuV2lkdGg9NTgw/Jm9kbkJnPUZGRkZG/Rg' },
      { role: 'footwear', image: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?q=80&w=1080' },
    ],
  },
  {
    id: 'o10',
    title: 'City Stroll',
    tags: ['Casual', 'Urban'],
    parts: [
      { role: 'top', image: 'https://images.unsplash.com/photo-1514989940723-e8e51635b782?q=80&w=1080' },
      { role: 'bottom', image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1080' },
      { role: 'footwear', image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=1080' },
      { role: 'outerwear', image: 'https://images.unsplash.com/photo-1514989940723-e8e51635b782?q=80&w=1080' },
    ],
  },
 
];
 
 

function CollectionCard({ col, saved, onToggleSave }) {
  return (
    <View
      style={{
        backgroundColor: '#fff',
        borderRadius: CARD_RADIUS,
        padding: SPACING,
        shadowColor: '#000',
        shadowOpacity: 0.04,
        shadowRadius: 8,
        elevation: 2,
      }}>
      <View style={{ flexDirection: 'row' }}>
        <Image
          source={{ uri: col.parts[0] }}
          style={{
            width: 120,
            height: 150,
            borderRadius: 12,
            backgroundColor: '#eee',
          }}
        />
        <View
          style={{
            flex: 1,
            paddingLeft: SPACING,
            justifyContent: 'space-between',
          }}>
          <Image
            source={{ uri: col.parts[1] }}
            style={{
              width: '100%',
              height: 70,
              borderRadius: 10,
              backgroundColor: '#eee',
              resizeMode: 'cover',
            }}
          />
          <Image
            source={{ uri: col.parts[2] }}
            style={{
              width: '100%',
              height: 70,
              borderRadius: 10,
              backgroundColor: '#eee',
              resizeMode: 'cover',
            }}
          />
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          marginTop: SPACING,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={onToggleSave}
          style={{
            width: 30,
            height: 30,
            borderRadius: 22,
            backgroundColor: '#eee',
            position: 'absolute',
            bottom: 10,
            right: 0,
            justifyContent: 'center',
            alignItems: 'center',
            shadowColor: '#000',
            shadowOpacity: 0.03,
            elevation: 1,
          }}>
          <Icon
            name={saved ? 'bookmark' : 'bookmark-outline'}
            size={20}
            color="#000"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function ItemCard({ item, saved, onToggleSave }) {
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(scale, {
        toValue: 0.98,
        duration: 0,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View style={{ flex: 1 / 2, padding: CARD_MARGIN / 2 }}>
      <Animated.View
        style={{
          backgroundColor: "#fff",
          borderRadius: 12,
          overflow: "hidden",
          transform: [{ scale }],
        }}
      >
        <TouchableOpacity activeOpacity={0.95}>
          {/* Product Image */}
          <Image
            source={{ uri: item.image }}
            style={{ width: "100%", height: 170, borderRadius: 12 }}
          />

          {/* Bookmark (top-right) */}
          <TouchableOpacity
            style={{
              position: "absolute",
              top: 10,
              right: 10,
              backgroundColor: "rgba(255,255,255,0.9)",
              borderRadius: 20,
              padding: 5,
            }}
            onPress={onToggleSave}
          >
            <Icon
              name={saved ? "bookmark-outline" : "bookmark"}
              size={20}
              color="#000"
            />
          </TouchableOpacity>

          {/* Tag chip (bottom-left, inside image) */}
          {item.tag && (
            <View
              style={{
                position: "absolute",
                bottom: 10,
                left: 10,
                backgroundColor: "rgba(255,255,255,0.95)",
                borderRadius: 8,
                paddingHorizontal: 8,
                paddingVertical: 4,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              {item.icon && (
                <Icon
                  name={item.icon}
                  size={14}
                  color="#000"
                  style={{ marginRight: 4 }}
                />
              )}
              <Text style={{ fontSize: 12, fontWeight: "500" }}>
                {item.tag}
              </Text>
            </View>
          )}
        </TouchableOpacity>

        {/* Title + Subtitle with small icon */}
        <View
          style={{
            paddingHorizontal: 10,
            paddingVertical: 8,
          }}
        >
          {/* Subtitle row */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 2,
            }}
          >
            {item.subtitleIcon && (
              <Image
                source={{ uri: item.subtitleIcon }}
                style={{ width: 14, height: 14, marginRight: 6 }}
              />
            )}
            <Text
              style={{
                fontSize: 14,
                fontWeight: "600",
              }}
              numberOfLines={1}
            >
              {item.subtitle}
            </Text>
          </View>

          {/* Title */}
          <Text
            style={{
              fontSize: 12,
              color: "#555",
            }}
            numberOfLines={1}
          >
            {item.title}
          </Text>
        </View>
      </Animated.View>
    </View>
  );
}





/* -----------------------
   Empty + Skeleton
   ----------------------- */
function EmptyState({ onReset }) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: SPACING * 2,
      }}>
      <Text style={{ fontSize: 18, fontWeight: '700', marginBottom: SPACING }}>
        No items found
      </Text>
      <Text
        style={{
          color: '#666',
          textAlign: 'center',
          marginBottom: SPACING * 1.5,
        }}>
        Try clearing filters or choose different options to see items.
      </Text>
      <TouchableOpacity
        onPress={onReset}
        style={{
          paddingHorizontal: SPACING * 2,
          paddingVertical: SPACING,
          backgroundColor: '#111',
          borderRadius: 8,
        }}>
        <Text style={{ color: '#fff', fontWeight: '700' }}>Reset filters</Text>
      </TouchableOpacity>
    </View>
  );
}
function SkeletonGrid() {
  const count = 6;
  const anim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(anim, {
          toValue: 1,
          duration: 700,
          useNativeDriver: false,
        }),
        Animated.timing(anim, {
          toValue: 0,
          duration: 700,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, []);
  const backgroundColor = anim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#efefef', '#f6f6f6'],
  });
  return (
    <View
      style={{ flexDirection: 'row', flexWrap: 'wrap', padding: CARD_MARGIN }}>
      {Array.from({ length: count }).map((_, i) => (
        <Animated.View
          key={i}
          style={{
            width:
              (SCREEN_WIDTH - CARD_MARGIN * (NUM_COLUMNS + 1)) / NUM_COLUMNS,
            height: CARD_WIDTH * 0.95,
            margin: CARD_MARGIN / 2,
            borderRadius: CARD_RADIUS,
            backgroundColor,
          }}
        />
      ))}
    </View>
  );
}

/* -----------------------
   Outfits carousel (subtle scale)
   ----------------------- */
function OutfitsCarousel({ outfits, savedOutfits, onToggleSave }) {
  const scrollY = useRef(new Animated.Value(0)).current;

  return (
    <Animated.FlatList
      data={outfits}
      keyExtractor={(o) => o.id}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ padding: SPACING * 2 }}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: true }
      )}
      renderItem={({ item, index }) => {
        // Optional subtle scale animation
        const inputRange = [-1, 0, 150 * index, 150 * (index + 2)];
        const scale = scrollY.interpolate({
          inputRange,
          outputRange: [1, 1, 1, 0.95],
          extrapolate: 'clamp',
        });
        const translateY = scrollY.interpolate({
          inputRange,
          outputRange: [0, 0, 0, 10],
          extrapolate: 'clamp',
        });

        return (
          <Animated.View
            style={{
              transform: [{ scale }, { translateY }],
              marginBottom: SPACING * 1.5,
            }}>
            <View
              style={{
                backgroundColor: '#fff',
                borderRadius: 14,
                padding: SPACING,
                shadowColor: '#000',
                shadowOpacity: 0.05,
                shadowRadius: 8,
                elevation: 4,
              }}>
              {/* Images layout */}
              <View style={{ flexDirection: 'row' }}>
                <Image
                  source={{ uri: item.parts[0]?.image }}
                  style={{
                    width: 120,
                    height: 150,
                    borderRadius: 12,
                    backgroundColor: '#eee',
                  }}
                />
                <View
                  style={{
                    flex: 1,
                    paddingLeft: SPACING,
                    justifyContent: 'space-between',
                  }}>
                  <Image
                    source={{ uri: item.parts[1]?.image }}
                    style={{
                      width: '100%',
                      height: 70,
                      borderRadius: 10,
                      backgroundColor: '#eee',
                      resizeMode: 'cover',
                    }}
                  />
                  <Image
                    source={{ uri: item.parts[2]?.image }}
                    style={{
                      width: '100%',
                      height: 70,
                      borderRadius: 10,
                      backgroundColor: '#eee',
                      resizeMode: 'cover',
                    }}
                  />
                </View>
              </View>

              {/* Title & tags */}
              <View style={{ marginTop: SPACING }}>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}></View>
              </View>

              {/* Bookmark button */}
              <TouchableOpacity
                onPress={onToggleSave}
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 22,
                  backgroundColor: '#eee',
                  position: 'absolute',
                  bottom: 20,
                  right: 8,
                  justifyContent: 'center',
                  alignItems: 'center',
                  shadowColor: '#000',
                  shadowOpacity: 0.03,
                  elevation: 1,
                }}>
                <Icon
                  name={
                    savedOutfits?.has(item.id) ? 'bookmark' : 'bookmark-outline'
                  }
                  size={20}
                  color="#000"
                />
              </TouchableOpacity>
            </View>
          </Animated.View>
        );
      }}
    />
  );
}

/* -----------------------
   SavedScreen: full UI (Collections / Outfits / Items)
   ----------------------- */
function SavedScreen() {
  // states (moved inside the screen)
  const [activeTab, setActiveTab] = useState('Collections');
  const [items, setItems] = useState(MOCK_ITEMS);
  const [collections, setCollections] = useState(MOCK_COLLECTIONS);
  const [outfits, setOutfits] = useState(MOCK_OUTFITS);
  const [loading, setLoading] = useState(true);

  const [categoryFilters, setCategoryFilters] = useState(new Set());
  const [colorFilters, setColorFilters] = useState(new Set());
  const [styleFilters, setStyleFilters] = useState(new Set());

  const [collectionChips] = useState([
    '+ Add new',
    'Work',
    'Leisure',
    'Design',
  ]);
  const [activeCollectionChips, setActiveCollectionChips] = useState(new Set());

  const [showTypeMenu, setShowTypeMenu] = useState(false);
  const [showStyleMenu, setShowStyleMenu] = useState(false);
  const [showMoodMenu, setShowMoodMenu] = useState(false);
  const [showColorMenu, setShowColorMenu] = useState(false);

  const [savedItems, setSavedItems] = useState(new Set());
  const [savedCollections, setSavedCollections] = useState(new Set());

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(t);
  }, []);

  const toggleSet = (set, updater, value) => {
    const next = new Set(set);
    if (next.has(value)) next.delete(value);
    else next.add(value);
    updater(next);
  };

  const clearAll = () => {
    setCategoryFilters(new Set());
    setColorFilters(new Set());
    setStyleFilters(new Set());
    setActiveCollectionChips(new Set());
  };

  const toggleSaveItem = (id) => {
    const next = new Set(savedItems);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSavedItems(next);
  };

  const toggleSaveCollection = (id) => {
    const next = new Set(savedCollections);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSavedCollections(next);
  };

  const toggleCollectionChip = (label) => {
    const next = new Set(activeCollectionChips);
    if (next.has(label)) next.delete(label);
    else next.add(label);
    setActiveCollectionChips(next);
  };

  const filteredItems = useMemo(() => {
    const any =
      categoryFilters.size ||
      colorFilters.size ||
      styleFilters.size ||
      activeCollectionChips.size;
    if (!any) return items;
    return items.filter((it) => {
      const passCategory = categoryFilters.size
        ? categoryFilters.has(it.category)
        : true;
      const passColor = colorFilters.size ? colorFilters.has(it.color) : true;
      const passStyle = styleFilters.size ? styleFilters.has(it.style) : true;
      return passCategory && passColor && passStyle;
    });
  }, [
    items,
    categoryFilters,
    colorFilters,
    styleFilters,
    activeCollectionChips,
  ]);

  const filteredCollections = useMemo(() => {
    if (
      !activeCollectionChips.size &&
      !categoryFilters.size &&
      !colorFilters.size &&
      !styleFilters.size
    )
      return collections;
    return collections.filter((col) => {
      const anyMatch = Array.from(activeCollectionChips).some((ch) =>
        col.tags.map((t) => t.toLowerCase()).includes(ch.toLowerCase())
      );
      return anyMatch || false;
    });
  }, [
    collections,
    activeCollectionChips,
    categoryFilters,
    colorFilters,
    styleFilters,
  ]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FBF9F6' }}>
      <View style={{ padding: SPACING * 2 }}>
        <Text style={{ fontSize: 24, fontWeight: '800', color: '#111' }}>
          Saved
        </Text>
      </View>

      {/* Segmented tabs */}
<View
  style={{
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#f2f0ee", // halka grey bg jaisa image me
    borderRadius: 25,
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 4,
  }}
>
  {["Collections", "Outfits", "Items"].map((t) => {
    const isActive = activeTab === t;
    return (
      <TouchableOpacity
        key={t}
        onPress={() => setActiveTab(t)}
        style={{
          flex: 1,
          paddingVertical: 8,
          paddingHorizontal: 18,
          borderRadius: 20,
          backgroundColor: isActive ? "#fff" : "transparent",
          shadowColor: isActive ? "#000" : "transparent",
          shadowOpacity: isActive ? 0.08 : 0,
          shadowRadius: isActive ? 4 : 0,
          elevation: isActive ? 2 : 0,
          alignItems: "center",
          justifyContent: "center",
        }}
        accessibilityRole="tab"
      >
        <Text
          style={{
            fontSize: 14,
            fontWeight: isActive ? "700" : "500",
            color: isActive ? "#111" : "#9a9a9a",
          }}
        >
          {t}
        </Text>
      </TouchableOpacity>
    );
  })}
</View>



      {/* Dynamic area under tabs */}
      {activeTab === 'Collections' && (
        <View
          style={{
            paddingBottom: SPACING,
            borderBottomWidth: 1,
            borderBottomColor: '#F3EFEA',
          }}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: SPACING * 2,
              paddingVertical: SPACING,
            }}>
            {collectionChips.map((c) => (
              <TouchableOpacity
                key={c}
                onPress={() => toggleCollectionChip(c)}
                style={{ marginRight: SPACING }}>
                <View
                  style={{
                    paddingHorizontal: SPACING * 1.2,
                    paddingVertical: 8,
                    borderRadius: 999,
                    backgroundColor: activeCollectionChips.has(c)
                      ? '#FDEFF1'
                      : '#FFF',
                    borderWidth: 1,
                    borderColor: activeCollectionChips.has(c)
                      ? '#F7DCDC'
                      : '#F1EDE9',
                    minHeight: 36,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: activeCollectionChips.has(c) ? '#C23D3D' : '#444',
                      fontSize: 13,
                      fontWeight: '600',
                    }}>
                    {c}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      {activeTab === 'Items' && (
        <View
          style={{
            paddingBottom: SPACING,
            borderBottomWidth: 1,
            borderBottomColor: '#F3EFEA',
          }}>
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: SPACING * 2,
              paddingVertical: SPACING,
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              onPress={() => setShowTypeMenu(!showTypeMenu)}
              style={{
                paddingHorizontal: SPACING,
                paddingVertical: 8,
                borderRadius: 999,
                borderWidth: 1,
                borderColor: '#F1EDE9',
                backgroundColor: '#fff',
                minWidth: 80,
                alignItems: 'center',
              }}>
              <Text style={{ fontSize: 13 }}>Type ▾</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setShowStyleMenu(!showStyleMenu)}
              style={{
                paddingHorizontal: SPACING,
                paddingVertical: 8,
                borderRadius: 999,
                borderWidth: 1,
                borderColor: '#F1EDE9',
                backgroundColor: '#fff',
                minWidth: 80,
                alignItems: 'center',
              }}>
              <Text style={{ fontSize: 13 }}>Style ▾</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setShowMoodMenu(!showMoodMenu)}
              style={{
                paddingHorizontal: SPACING,
                paddingVertical: 8,
                borderRadius: 999,
                borderWidth: 1,
                borderColor: '#F1EDE9',
                backgroundColor: '#fff',
                minWidth: 80,
                alignItems: 'center',
              }}>
              <Text style={{ fontSize: 13 }}>Mood ▾</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setShowColorMenu(!showColorMenu)}
              style={{
                paddingHorizontal: SPACING,
                paddingVertical: 8,
                borderRadius: 999,
                borderWidth: 1,
                borderColor: '#F1EDE9',
                backgroundColor: '#fff',
                minWidth: 80,
                alignItems: 'center',
              }}>
              <Text style={{ fontSize: 13 }}>Color ▾</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Main content */}
      <View style={{ flex: 1 }}>
        {activeTab === 'Collections' && (
          <CollectionsScreen
            collections={filteredCollections}
            saved={savedCollections}
            onToggleSave={toggleSaveCollection}
            loading={loading}
          />
        )}

        {activeTab === 'Outfits' && (
          <View style={{ flex: 1 }}>
            <OutfitsCarousel outfits={outfits} />
          </View>
        )}

        {activeTab === 'Items' && (
          <View style={{ flex: 1 }}>
            {loading ? (
              <SkeletonGrid />
            ) : filteredItems.length === 0 ? (
              <EmptyState onReset={clearAll} />
            ) : (
              <FlatList
                data={filteredItems}
                keyExtractor={(i) => i.id}
                numColumns={NUM_COLUMNS}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ padding: CARD_MARGIN }}
                renderItem={({ item }) => (
                  <ItemCard
                    item={item}
                    saved={savedItems.has(item.id)}
                    onToggleSave={() => toggleSaveItem(item.id)}
                  />
                )}
              />
            )}
          </View>
        )}
      </View>

      {/* FAB */}
      <TouchableOpacity
        style={{
          position: 'absolute',
          right: 16,
          bottom: 5,
          width: 56,
          height: 56,
          borderRadius: 28,
          backgroundColor: '#fff',
          justifyContent: 'center',
          alignItems: 'center',
          shadowColor: '#000',
          shadowOpacity: 0.08,
          elevation: 4,
        }}>
        <Text style={{ fontSize: 22 }}>✚</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

/* -----------------------
   CollectionsScreen used above
   ----------------------- */
function CollectionsScreen({ collections, saved, onToggleSave, loading }) {
  if (loading) return <SkeletonGrid />;
  if (!collections.length) return <EmptyState />;
  return (
    <FlatList
      data={collections}
      keyExtractor={(c) => c.id}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ padding: CARD_MARGIN }}
      renderItem={({ item }) => (
        <View style={{ marginBottom: SPACING * 1.5 }}>
          <CollectionCard
            col={item}
            saved={saved.has(item.id)}
            onToggleSave={() => onToggleSave(item.id)}
          />
        </View>
      )}
    />
  );
}

/* -----------------------
   Bottom navigation wrapper (Home / Explore / Saved)
   ----------------------- */
const Tab = createBottomTabNavigator();

/* -----------------------
   Root App with Tab navigator
   ----------------------- */
export default function App() {
  return (
<NavigationContainer>
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === "Home") {
          iconName = focused ? "home" : "home-outline";
        } else if (route.name === "Explore") {
          iconName = focused ? "view-split-horizontal" : "view-split-horizontal";
        } else if (route.name === "Saved") {
          iconName = focused ? "bookmark" : "bookmark-outline";
        }

        return (
          <MaterialCommunityIcons name={iconName} size={size} color={color} />
        );
      },
      tabBarActiveTintColor: "#000",
      tabBarInactiveTintColor: "gray",
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Explore" component={ExploreScreen} />
    <Tab.Screen name="Saved" component={SavedScreen} />
  </Tab.Navigator>
</NavigationContainer>

  );
}
