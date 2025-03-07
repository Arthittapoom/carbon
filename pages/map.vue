<template>
    <div>
      <h1>แผนที่ Leaflet</h1>
      <div id="map" style="height: 500px;">
        <client-only>
          <l-map :zoom="zoom" :center="center" @click="onMapClick">
            <l-tile-layer :url="tileLayerUrl" :attribution="tileLayerAttribution"></l-tile-layer>
            <l-marker v-for="(position, index) in markerPositions" :key="index" :lat-lng="position"></l-marker>
          </l-map>
        </client-only>
      </div>
      <div>
        <p>ตำแหน่งที่คลิก: {{ markerPosition }}</p>
        <button @click="addMarker">เพิ่มหมุดใหม่</button>
      </div>
  
      <h2>แผนที่ที่มีหมุดทั้งหมด</h2>
      <div id="mapAllMarkers" style="height: 500px;">
        <client-only>
          <l-map :zoom="zoom" :center="center">
            <l-tile-layer :url="tileLayerUrl" :attribution="tileLayerAttribution"></l-tile-layer>
            <l-marker v-for="(position, index) in markerPositions" :key="index" :lat-lng="position"></l-marker>
          </l-map>
        </client-only>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        zoom: 13, // ระดับการซูม
        center: [13.7563, 100.5018], // พิกัดเริ่มต้น (กรุงเทพฯ)
        tileLayerUrl: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', // URL สำหรับพื้นหลังแผนที่
        tileLayerAttribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors', // Attribution สำหรับ OpenStreetMap
        markerPosition: [13.7563, 100.5018], // ตำแหน่งของหมุดล่าสุด
        markerPositions: [[13.7563, 100.5018]], // ตำแหน่งหมุดทั้งหมดที่เก็บไว้
      };
    },
    methods: {
      onMapClick(event) {
        // เมื่อคลิกที่แผนที่ จะทำการอัพเดตตำแหน่งของหมุด
        const latLng = event.latlng;
        this.markerPosition = [latLng.lat, latLng.lng];
        this.markerPositions.push(this.markerPosition); // เพิ่มตำแหน่งใหม่เข้าไปในอาร์เรย์
      },
      addMarker() {
        // เพิ่มหมุดใหม่ที่ตำแหน่งเริ่มต้น
        const newPosition = [13.76, 100.50]; // ตัวอย่างตำแหน่งใหม่
        this.markerPositions.push(newPosition);
      }
    },
  };
  </script>
  
  <style scoped>
  #map {
    width: 100%;
    height: 500px;
  }
  #mapAllMarkers {
    width: 100%;
    height: 500px;
  }
  </style>
  