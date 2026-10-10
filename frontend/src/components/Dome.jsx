'use client';
import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useParams } from 'next/navigation';
import { useGesture } from '@use-gesture/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger outside the component
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// --- Static Database Mapping ---
const projectDataMap = {
  'product-shoot': {
    title: 'Product Shoot',
    subtitle: 'Minimalist commercial photography and cinematic lighting for luxury items.',
    category: 'Commercial Direction',
    client: 'Aura Lifestyle',
    year: '2025',
    role: 'Art Direction & Cinematography',
    description: 'A meticulous exploration of texture, form, and shadow. Using hard architectural lighting and organic props, we crafted a high-end visual identity that elevates everyday physical goods.',
    coverImage: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1600&q=80',
    categories: [
      {
        name: 'All',
        items: [
          { type: "image", url: "/Images/work/1.gif", alt: "All Item 1", title: "All Item 1" },
          { type: "image", url: "/Images/portfolio/graphic/restraurant/1.gif", alt: "Restaurant GIF", title: "Restaurant GIF" },
          { type: "image", url: "/Images/portfolio/graphic/restraurant/0.webp", alt: "Restaurant 0", title: "Restaurant 0" },
          { type: "image", url: "/Images/portfolio/graphic/restraurant/18.webp", alt: "Restaurant 18", title: "Restaurant 18" },
          { type: "image", url: "/Images/portfolio/graphic/restraurant/19.webp", alt: "Restaurant 19", title: "Restaurant 19" },
          { type: "image", url: "/Images/portfolio/graphic/restraurant/20.webp", alt: "Restaurant 20", title: "Restaurant 20" },
          { type: "image", url: "/Images/portfolio/graphic/restraurant/6.webp", alt: "Restaurant 6", title: "Restaurant 6" },
          { type: "image", url: "/Images/portfolio/graphic/restraurant/Restaurants8.webp", alt: "Restaurants 8", title: "Restaurants 8" },
          { type: "image", url: "/Images/portfolio/graphic/21.webp", alt: "Graphic 21", title: "Graphic 21" },
          { type: "image", url: "/Images/portfolio/graphic/15.webp", alt: "Graphic 15", title: "Graphic 15" },
          { type: "image", url: "/Images/portfolio/graphic/14.webp", alt: "Graphic 14", title: "Graphic 14" },
          { type: "image", url: "/Images/portfolio/graphic/22.webp", alt: "Graphic 22", title: "Graphic 22" },
          { type: "image", url: "/Images/portfolio/graphic/16.webp", alt: "Graphic 16", title: "Graphic 16" },
          { type: "image", url: "/Images/portfolio/graphic/13.webp", alt: "Graphic 13", title: "Graphic 13" },
          { type: "image", url: "/Images/portfolio/graphic/9.webp", alt: "Graphic 9", title: "Graphic 9" },
          { type: "image", url: "/Images/portfolio/graphic/6.webp", alt: "Graphic 6", title: "Graphic 6" },
          { type: "image", url: "/Images/portfolio/graphic/product/24.webp", alt: "Product 24", title: "Product 24" },
          { type: "image", url: "/Images/portfolio/graphic/product/26.webp", alt: "Product 26", title: "Product 26" },
          { type: "image", url: "/Images/portfolio/graphic/product/11.webp", alt: "Product 11", title: "Product 11" },
          { type: "image", url: "/Images/portfolio/graphic/product/12.webp", alt: "Product 12", title: "Product 12" },
          { type: "image", url: "/Images/portfolio/graphic/product/23.webp", alt: "Product 23", title: "Product 23" }
        ]
      },
      {
        name: 'Jewellery',
        items: [
          { type: "image", url: "/Images/portfolio/graphic/product/25.webp", alt: "Jewellery 25", title: "Jewellery Item" },
          { type: "image", url: "/Images/portfolio/graphic/product/product5.webp", alt: "Product 5", title: "Product 5" },
          { type: "image", url: "/Images/portfolio/graphic/product/product4.webp", alt: "Product 4", title: "Product 4" },
          { type: "image", url: "/Images/portfolio/graphic/product/product6.webp", alt: "Product 6", title: "Product 6" },
          { type: "image", url: "/Images/portfolio/graphic/product/j1.webp", alt: "Jewellery 1", title: "Jewellery 1" },
          { type: "image", url: "/Images/portfolio/graphic/product/j2.webp", alt: "Jewellery 2", title: "Jewellery 2" },
          { type: "image", url: "/Images/portfolio/graphic/product/j3.webp", alt: "Jewellery 3", title: "Jewellery 3" },
          { type: "image", url: "/Images/portfolio/graphic/product/j6.webp", alt: "Jewellery 6", title: "Jewellery 6" },
          { type: "image", url: "/Images/portfolio/graphic/product/j7.webp", alt: "Jewellery 7", title: "Jewellery 7" },
          { type: "image", url: "/Images/portfolio/graphic/product/j4.webp", alt: "Jewellery 4", title: "Jewellery 4" },
          { type: "image", url: "/Images/portfolio/graphic/product/j8.webp", alt: "Jewellery 8", title: "Jewellery 8" },
          { type: "image", url: "/Images/portfolio/graphic/product/j5.webp", alt: "Jewellery 5", title: "Jewellery 5" }
        ]
      },
      {
        name: 'Clubs',
        items: [
          { type: "image", url: "/Images/portfolio/graphic/restraurant/0.webp", alt: "Club 0", title: "Club Graphic" },
          { type: "image", url: "/Images/portfolio/graphic/restraurant/18.webp", alt: "Club 18", title: "Club Graphic" },
          { type: "image", url: "/Images/portfolio/graphic/restraurant/19.webp", alt: "Club 19", title: "Club Graphic" },
          { type: "image", url: "/Images/portfolio/graphic/restraurant/20.webp", alt: "Club 20", title: "Club Graphic" },
          { type: "image", url: "/Images/portfolio/graphic/restraurant/club1.webp", alt: "Club 1", title: "Club 1" },
          { type: "image", url: "/Images/portfolio/graphic/restraurant/club2.webp", alt: "Club 2", title: "Club 2" },
          { type: "image", url: "/Images/portfolio/graphic/restraurant/club3.webp", alt: "Club 3", title: "Club 3" },
          { type: "image", url: "/Images/portfolio/graphic/restraurant/club4.webp", alt: "Club 4", title: "Club 4" },
          { type: "image", url: "/Images/portfolio/graphic/restraurant/club5.webp", alt: "Club 5", title: "Club 5" },
          { type: "image", url: "/Images/portfolio/graphic/restraurant/Restaurants2.webp", alt: "Restaurants 2", title: "Restaurants 2" },
          { type: "image", url: "/Images/portfolio/graphic/restraurant/Restaurants8.webp", alt: "Restaurants 8", title: "Restaurants 8" },
          { type: "image", url: "/Images/portfolio/graphic/restraurant/1.gif", alt: "Club GIF", title: "Club GIF" }
        ]
      },
      {
        name: 'YT Thumbnails',
        items: [
          { type: "image", url: "/Images/portfolio/graphic/thumbnails/1.webp", alt: "Thumbnail 1", title: "YT Thumbnail 1" },
          { type: "image", url: "/Images/portfolio/graphic/thumbnails/2.webp", alt: "Thumbnail 2", title: "YT Thumbnail 2" },
          { type: "image", url: "/Images/portfolio/graphic/thumbnails/3.webp", alt: "Thumbnail 3", title: "YT Thumbnail 3" },
          { type: "image", url: "/Images/portfolio/graphic/thumbnails/4.webp", alt: "Thumbnail 4", title: "YT Thumbnail 4" },
          { type: "image", url: "/Images/portfolio/graphic/thumbnails/5.webp", alt: "Thumbnail 5", title: "YT Thumbnail 5" }
        ]
      },
      {
        name: 'Visiting Cards',
        items: [
          { type: "image", url: "/Images/portfolio/graphic/visitingcard/10.webp", alt: "Visiting Card 10", title: "Visiting Card" },
          { type: "image", url: "/Images/portfolio/graphic/visitingcard/surveksha.webp", alt: "Surveksha Visiting Card", title: "Surveksha" },
          { type: "image", url: "/Images/portfolio/graphic/label/11.webp", alt: "Label 11", title: "Card Label" },
          { type: "image", url: "/Images/portfolio/graphic/visitingcard/1.webp", alt: "Visiting Card 1", title: "Visiting Card 1" },
          { type: "image", url: "/Images/portfolio/graphic/visitingcard/ibanta.webp", alt: "Ibanta Card", title: "Ibanta" },
          { type: "image", url: "/Images/portfolio/graphic/visitingcard/4.webp", alt: "Visiting Card 4", title: "Visiting Card 4" },
          { type: "image", url: "/Images/portfolio/graphic/visitingcard/6.webp", alt: "Visiting Card 6", title: "Visiting Card 6" },
          { type: "image", url: "/Images/portfolio/graphic/visitingcard/7.webp", alt: "Visiting Card 7", title: "Visiting Card 7" },
          { type: "image", url: "/Images/portfolio/graphic/visitingcard/royalpalm.webp", alt: "Royal Palm Card", title: "Royal Palm" },
          { type: "image", url: "/Images/portfolio/graphic/visitingcard/santosh.webp", alt: "Santosh Card", title: "Santosh" }
        ]
      },
      {
        name: 'Packaging Designs',
        items: [
          { type: "image", url: "/Images/portfolio/graphic/packaging/6.webp", alt: "Packaging 6", title: "Packaging 6" },
          { type: "image", url: "/Images/portfolio/graphic/label/p2.webp", alt: "Label p2", title: "Label p2" },
          { type: "image", url: "/Images/portfolio/graphic/label/p3.webp", alt: "Label p3", title: "Label p3" },
          { type: "image", url: "/Images/portfolio/graphic/packaging/5.webp", alt: "Packaging 5", title: "Packaging 5" },
          { type: "image", url: "/Images/portfolio/graphic/label/p1.webp", alt: "Label p1", title: "Label p1" },
          { type: "image", url: "/Images/portfolio/graphic/label/9.webp", alt: "Label 9", title: "Label 9" },
          { type: "image", url: "/Images/portfolio/graphic/label/12.webp", alt: "Label 12", title: "Label 12" },
          { type: "image", url: "/Images/portfolio/graphic/label/13.webp", alt: "Label 13", title: "Label 13" },
          { type: "image", url: "/Images/portfolio/graphic/label/14.webp", alt: "Label 14", title: "Label 14" },
          { type: "image", url: "/Images/portfolio/graphic/label/packaging1.webp", alt: "Packaging 1", title: "Packaging 1" },
          { type: "image", url: "/Images/portfolio/graphic/label/packaging2.webp", alt: "Packaging 2", title: "Packaging 2" },
          { type: "image", url: "/Images/portfolio/graphic/label/packaging3.webp", alt: "Packaging 3", title: "Packaging 3" },
          { type: "image", url: "/Images/portfolio/graphic/packaging/4.webp", alt: "Packaging 4", title: "Packaging 4" },
          { type: "image", url: "/Images/portfolio/graphic/label/label6.webp", alt: "Label 6", title: "Label 6" }
        ]
      },
      {
        name: 'Logo/Brochure/Catalogue',
        items: [
          { type: "image", url: "/Images/portfolio/graphic/product/saajriwaaj.webp", alt: "Saajriwaaj", title: "Saajriwaaj" },
          { type: "image", url: "/Images/portfolio/graphic/label/daf.webp", alt: "DAF", title: "DAF" },
          { type: "image", url: "/Images/portfolio/graphic/label/surveksha.webp", alt: "Surveksha", title: "Surveksha" },
          { type: "image", url: "/Images/portfolio/graphic/label/prodsol.webp", alt: "Prodsol", title: "Prodsol" },
          { type: "image", url: "/Images/portfolio/graphic/label/10.webp", alt: "Label 10", title: "Label 10" },
          { type: "image", url: "/Images/portfolio/graphic/label/logo.webp", alt: "Logo", title: "Logo" },
          { type: "image", url: "/Images/portfolio/graphic/label/label5.webp", alt: "Label 5", title: "Label 5" },
          { type: "image", url: "/Images/portfolio/graphic/label/logo1.webp", alt: "Logo 1", title: "Logo 1" },
          { type: "image", url: "/Images/portfolio/graphic/label/cover.webp", alt: "Cover", title: "Cover" },
          { type: "image", url: "/Images/portfolio/graphic/label/cover1.webp", alt: "Cover 1", title: "Cover 1" }
        ]
      },
      {
        name: 'Restaurant',
        items: [
          { type: "image", url: "/Images/portfolio/graphic/restraurant/6.webp", alt: "Restaurant 6", title: "Restaurant 6" },
          { type: "image", url: "/Images/portfolio/graphic/food/3.webp", alt: "Food 3", title: "Food 3" },
          { type: "image", url: "/Images/portfolio/graphic/food/Restaurants4.webp", alt: "Restaurants 4", title: "Restaurants 4" },
          { type: "image", url: "/Images/portfolio/graphic/food/Restaurants3.webp", alt: "Restaurants 3", title: "Restaurants 3" },
          { type: "image", url: "/Images/portfolio/graphic/restraurant/Restaurants1.webp", alt: "Restaurants 1", title: "Restaurants 1" },
          { type: "image", url: "/Images/portfolio/graphic/restraurant/Restaurants10.webp", alt: "Restaurants 10", title: "Restaurants 10" },
          { type: "image", url: "/Images/portfolio/graphic/restraurant/Restaurants3.webp", alt: "Restaurants 3 Alt", title: "Restaurants 3" },
          { type: "image", url: "/Images/portfolio/graphic/restraurant/Restaurants4.webp", alt: "Restaurants 4 Alt", title: "Restaurants 4" },
          { type: "image", url: "/Images/portfolio/graphic/restraurant/Restaurants5.webp", alt: "Restaurants 5", title: "Restaurants 5" },
          { type: "image", url: "/Images/portfolio/graphic/restraurant/Restaurants6.webp", alt: "Restaurants 6", title: "Restaurants 6" },
          { type: "image", url: "/Images/portfolio/graphic/restraurant/Restaurants7.webp", alt: "Restaurants 7", title: "Restaurants 7" },
          { type: "image", url: "/Images/portfolio/graphic/restraurant/Restaurants9.webp", alt: "Restaurants 9", title: "Restaurants 9" },
          { type: "image", url: "/Images/portfolio/graphic/restraurant/Restaurants11.webp", alt: "Restaurants 11", title: "Restaurants 11" },
          { type: "image", url: "/Images/portfolio/graphic/restraurant/Restaurants12.webp", alt: "Restaurants 12", title: "Restaurants 12" },
          { type: "image", url: "/Images/portfolio/graphic/restraurant/Restaurants13.webp", alt: "Restaurants 13", title: "Restaurants 13" },
          { type: "image", url: "/Images/portfolio/graphic/restraurant/Restaurants14.webp", alt: "Restaurants 14", title: "Restaurants 14" },
          { type: "image", url: "/Images/portfolio/graphic/restraurant/daawath1.webp", alt: "Daawath 1", title: "Daawath 1" },
          { type: "image", url: "/Images/portfolio/graphic/restraurant/daawath2.webp", alt: "Daawath 2", title: "Daawath 2" },
          { type: "image", url: "/Images/portfolio/graphic/restraurant/daawath3.webp", alt: "Daawath 3", title: "Daawath 3" }
        ]
      },
      {
        name: 'Products',
        items: [
          { type: "image", url: "/Images/portfolio/graphic/product/sr.webp", alt: "SR", title: "SR Product" },
          { type: "image", url: "/Images/portfolio/graphic/product/2kahumbo.webp", alt: "Kahumbo 2", title: "Kahumbo 2" },
          { type: "image", url: "/Images/portfolio/graphic/product/3kahumbo.webp", alt: "Kahumbo 3", title: "Kahumbo 3" },
          { type: "image", url: "/Images/portfolio/graphic/product/4kahumbo.webp", alt: "Kahumbo 4", title: "Kahumbo 4" },
          { type: "image", url: "/Images/portfolio/graphic/product/mubasa1.webp", alt: "Mubasa 1", title: "Mubasa 1" },
          { type: "image", url: "/Images/portfolio/graphic/product/mubasa2.webp", alt: "Mubasa 2", title: "Mubasa 2" },
          { type: "image", url: "/Images/portfolio/graphic/product/1kahumbo.webp", alt: "Kahumbo 1", title: "Kahumbo 1" },
          { type: "image", url: "/Images/portfolio/graphic/product/mubasa3.webp", alt: "Mubasa 3", title: "Mubasa 3" },
          { type: "image", url: "/Images/portfolio/graphic/product/murgi1.webp", alt: "Murgi 1", title: "Murgi 1" },
          { type: "image", url: "/Images/portfolio/graphic/product/murgi2.webp", alt: "Murgi 2", title: "Murgi 2" },
          { type: "image", url: "/Images/portfolio/graphic/product/ibnta1.webp", alt: "Ibnta 1", title: "Ibnta 1" },
          { type: "image", url: "/Images/portfolio/graphic/product/liqa1.webp", alt: "Liqa 1", title: "Liqa 1" },
          { type: "image", url: "/Images/portfolio/graphic/product/liqa2.webp", alt: "Liqa 2", title: "Liqa 2" },
          { type: "image", url: "/Images/portfolio/graphic/product/liqa5.webp", alt: "Liqa 5", title: "Liqa 5" },
          { type: "image", url: "/Images/portfolio/graphic/product/liqa6.webp", alt: "Liqa 6", title: "Liqa 6" },
          { type: "image", url: "/Images/portfolio/graphic/product/liqa7.webp", alt: "Liqa 7", title: "Liqa 7" },
          { type: "image", url: "/Images/portfolio/graphic/product/canco1.webp", alt: "Canco 1", title: "Canco 1" },
          { type: "image", url: "/Images/portfolio/graphic/product/canco2.webp", alt: "Canco 2", title: "Canco 2" },
          { type: "image", url: "/Images/portfolio/graphic/product/canco3.webp", alt: "Canco 3", title: "Canco 3" },
          { type: "image", url: "/Images/portfolio/graphic/product/murgi6.webp", alt: "Murgi 6", title: "Murgi 6" },
          { type: "image", url: "/Images/portfolio/graphic/product/daf4.webp", alt: "DAF 4", title: "DAF 4" },
          { type: "image", url: "/Images/portfolio/graphic/product/daf5.webp", alt: "DAF 5", title: "DAF 5" },
          { type: "image", url: "/Images/portfolio/graphic/product/canco4.webp", alt: "Canco 4", title: "Canco 4" },
          { type: "image", url: "/Images/portfolio/graphic/product/kumbo1.webp", alt: "Kumbo 1", title: "Kumbo 1" },
          { type: "image", url: "/Images/portfolio/graphic/product/kumbo2.webp", alt: "Kumbo 2", title: "Kumbo 2" },
          { type: "image", url: "/Images/portfolio/graphic/product/kumbo3.webp", alt: "Kumbo 3", title: "Kumbo 3" },
          { type: "image", url: "/Images/portfolio/graphic/product/kumbo4.webp", alt: "Kumbo 4", title: "Kumbo 4" },
          { type: "image", url: "/Images/portfolio/graphic/product/kumbo5.webp", alt: "Kumbo 5", title: "Kumbo 5" },
          { type: "image", url: "/Images/portfolio/graphic/product/kumbo6.webp", alt: "Kumbo 6", title: "Kumbo 6" },
          { type: "image", url: "/Images/portfolio/graphic/product/kumbo7.webp", alt: "Kumbo 7", title: "Kumbo 7" },
          { type: "image", url: "/Images/portfolio/graphic/product/murgi7.webp", alt: "Murgi 7", title: "Murgi 7" },
          { type: "image", url: "/Images/portfolio/graphic/product/murgi8.webp", alt: "Murgi 8", title: "Murgi 8" },
          { type: "image", url: "/Images/portfolio/graphic/product/murgi9.webp", alt: "Murgi 9", title: "Murgi 9" },
          { type: "image", url: "/Images/portfolio/graphic/product/murgi10.webp", alt: "Murgi 10", title: "Murgi 10" },
          { type: "image", url: "/Images/portfolio/graphic/product/murgi11.webp", alt: "Murgi 11", title: "Murgi 11" },
          { type: "image", url: "/Images/portfolio/graphic/product/murgi12.webp", alt: "Murgi 12", title: "Murgi 12" },
          { type: "image", url: "/Images/portfolio/graphic/product/canco5.webp", alt: "Canco 5", title: "Canco 5" },
          { type: "image", url: "/Images/portfolio/graphic/product/canco6.webp", alt: "Canco 6", title: "Canco 6" },
          { type: "image", url: "/Images/portfolio/graphic/product/canco7.webp", alt: "Canco 7", title: "Canco 7" },
          { type: "image", url: "/Images/portfolio/graphic/product/canco8.webp", alt: "Canco 8", title: "Canco 8" },
          { type: "image", url: "/Images/portfolio/graphic/product/ibnta2.webp", alt: "Ibnta 2", title: "Ibnta 2" },
          { type: "image", url: "/Images/portfolio/graphic/product/ibnta3.webp", alt: "Ibnta 3", title: "Ibnta 3" },
          { type: "image", url: "/Images/portfolio/graphic/product/ibnta4.webp", alt: "Ibnta 4", title: "Ibnta 4" },
          { type: "image", url: "/Images/portfolio/graphic/product/ibnta5.webp", alt: "Ibnta 5", title: "Ibnta 5" },
          { type: "image", url: "/Images/portfolio/graphic/product/daf6.webp", alt: "DAF 6", title: "DAF 6" },
          { type: "image", url: "/Images/portfolio/graphic/product/daf7.webp", alt: "DAF 7", title: "DAF 7" },
          { type: "image", url: "/Images/portfolio/graphic/product/daf8.webp", alt: "DAF 8", title: "DAF 8" },
          { type: "image", url: "/Images/portfolio/graphic/product/daf9.webp", alt: "DAF 9", title: "DAF 9" },
          { type: "image", url: "/Images/portfolio/graphic/product/kumbo8.webp", alt: "Kumbo 8", title: "Kumbo 8" },
          { type: "image", url: "/Images/portfolio/graphic/product/jaggis1.webp", alt: "Jaggis 1", title: "Jaggis 1" }
        ]
      },
      {
        name: 'education',
        items: [
          { type: "image", url: "/Images/portfolio/graphic/education/1.webp", alt: "Education 1", title: "Education 1" },
          { type: "image", url: "/Images/portfolio/graphic/education/2.webp", alt: "Education 2", title: "Education 2" },
          { type: "image", url: "/Images/portfolio/graphic/education/3.webp", alt: "Education 3", title: "Education 3" },
          { type: "image", url: "/Images/portfolio/graphic/education/4.webp", alt: "Education 4", title: "Education 4" },
          { type: "image", url: "/Images/portfolio/graphic/education/5.webp", alt: "Education 5", title: "Education 5" },
          { type: "image", url: "/Images/portfolio/graphic/education/6.webp", alt: "Education 6", title: "Education 6" },
          { type: "image", url: "/Images/portfolio/graphic/education/7.webp", alt: "Education 7", title: "Education 7" },
          { type: "image", url: "/Images/portfolio/graphic/education/8.webp", alt: "Education 8", title: "Education 8" }
        ]
      },
      {
        name: 'printing',
        items: [
          { type: "image", url: "/Images/portfolio/graphic/label/leaflet.webp", alt: "Leaflet", title: "Leaflet" },
          { type: "image", url: "/Images/portfolio/graphic/restraurant/21.webp", alt: "Printing 21", title: "Printing Item" },
          { type: "image", url: "/Images/portfolio/graphic/restraurant/22.webp", alt: "Printing 22", title: "Printing Item" },
          { type: "image", url: "/Images/portfolio/graphic/restraurant/23.webp", alt: "Printing 23", title: "Printing Item" },
          { type: "image", url: "/Images/portfolio/graphic/restraurant/24.webp", alt: "Printing 24", title: "Printing Item" },
          { type: "image", url: "/Images/portfolio/graphic/restraurant/25.webp", alt: "Printing 25", title: "Printing Item" },
          { type: "image", url: "/Images/portfolio/graphic/restraurant/26.webp", alt: "Printing 26", title: "Printing Item" },
          { type: "image", url: "/Images/portfolio/graphic/restraurant/27.webp", alt: "Printing 27", title: "Printing Item" },
          { type: "image", url: "/Images/portfolio/graphic/label/banner.webp", alt: "Banner", title: "Banner" },
          { type: "image", url: "/Images/portfolio/graphic/label/banner1.webp", alt: "Banner 1", title: "Banner 1" },
          { type: "image", url: "/Images/portfolio/graphic/restraurant/28.webp", alt: "Printing 28", title: "Printing Item" }
        ]
      },
      {
        name: 'Menu',
        items: [
          { type: "iframe", fullurl: "https://online.fliphtml5.com/jbrzt/Food-Menu-Black/", url: "/Images/thumbnail/oasis3.webp", alt: "Food Menu Black", title: "Food Menu Black" },
          { type: "iframe", fullurl: "https://online.fliphtml5.com/jbrzt/Jaggi-Resorts_compressed/", url: "/Images/thumbnail/oasis4.webp", alt: "Jaggi Resorts Menu", title: "Jaggi Resorts Menu" },
          { type: "iframe", fullurl: "https://online.fliphtml5.com/jbrzt/Shaurya-Menu-compressed/", url: "/Images/thumbnail/oasis5.webp", alt: "Shaurya Menu", title: "Shaurya Menu" }
        ]
      },
      {
        name: 'Scanner',
        items: [
          { type: "image", url: "/Images/portfolio/graphic/label/scanner.webp", alt: "Scanner", title: "Scanner" },
          { type: "image", url: "/Images/portfolio/graphic/label/scanner1.webp", alt: "Scanner 1", title: "Scanner 1" }
        ]
      }
    ],
    gallery: [
      { type: "image", url: "/Images/work/1.gif", alt: "Gallery Item 1", title: "Gallery Item 1" }
    ]
  }
};

const DEFAULTS = {
  maxVerticalRotationDeg: 5,
  dragSensitivity: 20,
  enlargeTransitionMs: 300,
  segments: 35
};

const clamp = (v, min, max) => Math.min(Math.max(v, min), max);
const normalizeAngle = d => ((d % 360) + 360) % 360;
const wrapAngleSigned = deg => {
  const a = (((deg + 180) % 360) + 360) % 360;
  return a - 180;
};
const getDataNumber = (el, name, fallback) => {
  const attr = el.dataset[name] ?? el.getAttribute(`data-${name}`);
  const n = attr == null ? NaN : parseFloat(attr);
  return Number.isFinite(n) ? n : fallback;
};

function buildItems(pool, seg) {
  const xCols = Array.from({ length: seg }, (_, i) => -37 + i * 2);
  const evenYs = [-4, -2, 0, 2, 4];
  const oddYs = [-3, -1, 1, 3, 5];

  const coords = xCols.flatMap((x, c) => {
    const ys = c % 2 === 0 ? evenYs : oddYs;
    return ys.map(y => ({ x, y, sizeX: 2, sizeY: 2 }));
  });

  const totalSlots = coords.length;
  if (pool.length === 0) {
    return coords.map(c => ({ ...c, src: '', alt: '' }));
  }

  const normalizedImages = pool.map(image => {
    if (typeof image === 'string') {
      return { src: image, alt: '' };
    }
    return { src: image.src || image.url || '', alt: image.alt || '' };
  });

  const usedImages = Array.from({ length: totalSlots }, (_, i) => normalizedImages[i % normalizedImages.length]);

  return coords.map((c, i) => ({
    ...c,
    src: usedImages[i].src,
    alt: usedImages[i].alt
  }));
}

function computeItemBaseRotation(offsetX, offsetY, sizeX, sizeY, segments) {
  const unit = 360 / segments / 2;
  const rotateY = unit * (offsetX + (sizeX - 1) / 2);
  const rotateX = unit * (offsetY - (sizeY - 1) / 2);
  return { rotateX, rotateY };
}

// --- DomeGallery Component ---
function DomeGallery({
  images = [],
  fit = 0.5,
  fitBasis = 'auto',
  minRadius = 600,
  maxRadius = Infinity,
  padFactor = 0.25,
  overlayBlurColor = '#120F17',
  maxVerticalRotationDeg = DEFAULTS.maxVerticalRotationDeg,
  dragSensitivity = DEFAULTS.dragSensitivity,
  enlargeTransitionMs = DEFAULTS.enlargeTransitionMs,
  segments = DEFAULTS.segments,
  dragDampening = 2,
  openedImageWidth = '400px',
  openedImageHeight = '400px',
  imageBorderRadius = '30px',
  openedImageBorderRadius = '30px',
  grayscale = false
}) {
  const rootRef = useRef(null);
  const mainRef = useRef(null);
  const sphereRef = useRef(null);
  const frameRef = useRef(null);
  const viewerRef = useRef(null);
  const scrimRef = useRef(null);
  const focusedElRef = useRef(null);
  const originalTilePositionRef = useRef(null);

  const rotationRef = useRef({ x: 0, y: 0 });
  const startRotRef = useRef({ x: 0, y: 0 });
  const startPosRef = useRef(null);
  const draggingRef = useRef(false);
  const movedRef = useRef(false);
  const inertiaRAF = useRef(null);
  const openingRef = useRef(false);
  const openStartedAtRef = useRef(0);
  const lastDragEndAt = useRef(0);

  const scrollLockedRef = useRef(false);
  const lockScroll = useCallback(() => {
    if (scrollLockedRef.current) return;
    scrollLockedRef.current = true;
    document.body.classList.add('dg-scroll-lock');
  }, []);
  const unlockScroll = useCallback(() => {
    if (!scrollLockedRef.current) return;
    if (rootRef.current?.getAttribute('data-enlarging') === 'true') return;
    scrollLockedRef.current = false;
    document.body.classList.remove('dg-scroll-lock');
  }, []);

  const items = useMemo(() => buildItems(images, segments), [images, segments]);

  const applyTransform = (xDeg, yDeg) => {
    const el = sphereRef.current;
    if (el) {
      el.style.transform = `translateZ(calc(var(--radius) * -1)) rotateX(${xDeg}deg) rotateY(${yDeg}deg)`;
    }
  };

  const lockedRadiusRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const ro = new ResizeObserver(entries => {
      const cr = entries[0].contentRect;
      const w = Math.max(1, cr.width),
        h = Math.max(1, cr.height);
      const minDim = Math.min(w, h),
        maxDim = Math.max(w, h),
        aspect = w / h;
      let basis;
      switch (fitBasis) {
        case 'min': basis = minDim; break;
        case 'max': basis = maxDim; break;
        case 'width': basis = w; break;
        case 'height': basis = h; break;
        default: basis = aspect >= 1.3 ? w : minDim;
      }
      let radius = basis * fit;
      const heightGuard = h * 1.35;
      radius = Math.min(radius, heightGuard);
      radius = clamp(radius, minRadius, maxRadius);
      lockedRadiusRef.current = Math.round(radius);

      const viewerPad = Math.max(8, Math.round(minDim * padFactor));
      root.style.setProperty('--radius', `${lockedRadiusRef.current}px`);
      root.style.setProperty('--viewer-pad', `${viewerPad}px`);
      root.style.setProperty('--overlay-blur-color', overlayBlurColor);
      root.style.setProperty('--tile-radius', imageBorderRadius);
      root.style.setProperty('--enlarge-radius', openedImageBorderRadius);
      root.style.setProperty('--image-filter', grayscale ? 'grayscale(1)' : 'none');
      applyTransform(rotationRef.current.x, rotationRef.current.y);
    });
    ro.observe(root);
    return () => ro.disconnect();
  }, [fit, fitBasis, minRadius, maxRadius, padFactor, overlayBlurColor, grayscale, imageBorderRadius, openedImageBorderRadius]);

  useEffect(() => {
    applyTransform(rotationRef.current.x, rotationRef.current.y);
  }, []);

  const stopInertia = useCallback(() => {
    if (inertiaRAF.current) {
      cancelAnimationFrame(inertiaRAF.current);
      inertiaRAF.current = null;
    }
  }, []);

  const startInertia = useCallback(
    (vx, vy) => {
      const MAX_V = 1.4;
      let vX = clamp(vx, -MAX_V, MAX_V) * 80;
      let vY = clamp(vy, -MAX_V, MAX_V) * 80;
      let frames = 0;
      const d = clamp(dragDampening ?? 0.6, 0, 1);
      const frictionMul = 0.94 + 0.055 * d;
      const stopThreshold = 0.015 - 0.01 * d;
      const maxFrames = Math.round(90 + 270 * d);
      const step = () => {
        vX *= frictionMul;
        vY *= frictionMul;
        if (Math.abs(vX) < stopThreshold && Math.abs(vY) < stopThreshold) {
          inertiaRAF.current = null;
          return;
        }
        if (++frames > maxFrames) {
          inertiaRAF.current = null;
          return;
        }
        const nextX = clamp(rotationRef.current.x - vY / 200, -maxVerticalRotationDeg, maxVerticalRotationDeg);
        const nextY = wrapAngleSigned(rotationRef.current.y + vX / 200);
        rotationRef.current = { x: nextX, y: nextY };
        applyTransform(nextX, nextY);
        inertiaRAF.current = requestAnimationFrame(step);
      };
      stopInertia();
      inertiaRAF.current = requestAnimationFrame(step);
    },
    [dragDampening, maxVerticalRotationDeg, stopInertia]
  );

  useGesture(
    {
      onDragStart: ({ event }) => {
        if (focusedElRef.current) return;
        stopInertia();
        const evt = event;
        draggingRef.current = true;
        movedRef.current = false;
        startRotRef.current = { ...rotationRef.current };
        startPosRef.current = { x: evt.clientX, y: evt.clientY };
      },
      onDrag: ({ event, last, velocity = [0, 0], direction = [0, 0], movement }) => {
        if (focusedElRef.current || !draggingRef.current || !startPosRef.current) return;
        const evt = event;
        const dxTotal = evt.clientX - startPosRef.current.x;
        const dyTotal = evt.clientY - startPosRef.current.y;
        if (!movedRef.current) {
          const dist2 = dxTotal * dxTotal + dyTotal * dyTotal;
          if (dist2 > 16) movedRef.current = true;
        }
        const nextX = clamp(
          startRotRef.current.x - dyTotal / dragSensitivity,
          -maxVerticalRotationDeg,
          maxVerticalRotationDeg
        );
        const nextY = wrapAngleSigned(startRotRef.current.y + dxTotal / dragSensitivity);
        if (rotationRef.current.x !== nextX || rotationRef.current.y !== nextY) {
          rotationRef.current = { x: nextX, y: nextY };
          applyTransform(nextX, nextY);
        }
        if (last) {
          draggingRef.current = false;
          let [vMagX, vMagY] = velocity;
          const [dirX, dirY] = direction;
          let vx = vMagX * dirX;
          let vy = vMagY * dirY;
          if (Math.abs(vx) < 0.001 && Math.abs(vy) < 0.001 && Array.isArray(movement)) {
            const [mx, my] = movement;
            vx = clamp((mx / dragSensitivity) * 0.02, -1.2, 1.2);
            vy = clamp((my / dragSensitivity) * 0.02, -1.2, 1.2);
          }
          if (Math.abs(vx) > 0.005 || Math.abs(vy) > 0.005) startInertia(vx, vy);
          if (movedRef.current) lastDragEndAt.current = performance.now();
          movedRef.current = false;
        }
      }
    },
    { target: mainRef, eventOptions: { passive: true } }
  );

  useEffect(() => {
    const scrim = scrimRef.current;
    if (!scrim) return;
    const close = () => {
      if (performance.now() - openStartedAtRef.current < 250) return;
      const el = focusedElRef.current;
      if (!el) return;
      const parent = el.parentElement;
      const overlay = viewerRef.current?.querySelector('.enlarge');
      if (!overlay) return;
      const refDiv = parent.querySelector('.item__image--reference');
      const originalPos = originalTilePositionRef.current;
      if (!originalPos) {
        overlay.remove();
        if (refDiv) refDiv.remove();
        parent.style.setProperty('--rot-y-delta', '0deg');
        parent.style.setProperty('--rot-x-delta', '0deg');
        el.style.visibility = '';
        el.style.zIndex = 0;
        focusedElRef.current = null;
        rootRef.current?.removeAttribute('data-enlarging');
        openingRef.current = false;
        unlockScroll();
        return;
      }
      const currentRect = overlay.getBoundingClientRect();
      const rootRect = rootRef.current.getBoundingClientRect();
      const originalPosRelativeToRoot = {
        left: originalPos.left - rootRect.left,
        top: originalPos.top - rootRect.top,
        width: originalPos.width,
        height: originalPos.height
      };
      const overlayRelativeToRoot = {
        left: currentRect.left - rootRect.left,
        top: currentRect.top - rootRect.top,
        width: currentRect.width,
        height: currentRect.height
      };
      const animatingOverlay = document.createElement('div');
      animatingOverlay.className = 'enlarge-closing';
      animatingOverlay.style.cssText = `position:absolute;left:${overlayRelativeToRoot.left}px;top:${overlayRelativeToRoot.top}px;width:${overlayRelativeToRoot.width}px;height:${overlayRelativeToRoot.height}px;z-index:9999;border-radius: var(--enlarge-radius, 32px);overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,.35);transition:all ${enlargeTransitionMs}ms ease-out;pointer-events:none;margin:0;transform:none;`;
      const originalImg = overlay.querySelector('img');
      if (originalImg) {
        const img = originalImg.cloneNode();
        img.style.cssText = 'width:100%;height:100%;object-fit:cover;';
        animatingOverlay.appendChild(img);
      }
      overlay.remove();
      rootRef.current.appendChild(animatingOverlay);
      void animatingOverlay.getBoundingClientRect();
      requestAnimationFrame(() => {
        animatingOverlay.style.left = originalPosRelativeToRoot.left + 'px';
        animatingOverlay.style.top = originalPosRelativeToRoot.top + 'px';
        animatingOverlay.style.width = originalPosRelativeToRoot.width + 'px';
        animatingOverlay.style.height = originalPosRelativeToRoot.height + 'px';
        animatingOverlay.style.opacity = '0';
      });
      const cleanup = () => {
        animatingOverlay.remove();
        originalTilePositionRef.current = null;
        if (refDiv) refDiv.remove();
        parent.style.transition = 'none';
        el.style.transition = 'none';
        parent.style.setProperty('--rot-y-delta', '0deg');
        parent.style.setProperty('--rot-x-delta', '0deg');
        requestAnimationFrame(() => {
          el.style.visibility = '';
          el.style.opacity = '0';
          el.style.zIndex = 0;
          focusedElRef.current = null;
          rootRef.current?.removeAttribute('data-enlarging');
          requestAnimationFrame(() => {
            parent.style.transition = '';
            el.style.transition = 'opacity 300ms ease-out';
            requestAnimationFrame(() => {
              el.style.opacity = '1';
              setTimeout(() => {
                el.style.transition = '';
                el.style.opacity = '';
                openingRef.current = false;
                if (!draggingRef.current && rootRef.current?.getAttribute('data-enlarging') !== 'true')
                  document.body.classList.remove('dg-scroll-lock');
              }, 300);
            });
          });
        });
      };
      animatingOverlay.addEventListener('transitionend', cleanup, { once: true });
    };
    scrim.addEventListener('click', close);
    const onKey = e => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      scrim.removeEventListener('click', close);
      window.removeEventListener('keydown', onKey);
    };
  }, [enlargeTransitionMs, unlockScroll]);

  const openItemFromElement = useCallback(
    el => {
      if (openingRef.current) return;
      openingRef.current = true;
      openStartedAtRef.current = performance.now();
      lockScroll();
      const parent = el.parentElement;
      focusedElRef.current = el;
      el.setAttribute('data-focused', 'true');
      const offsetX = getDataNumber(parent, 'offsetX', 0);
      const offsetY = getDataNumber(parent, 'offsetY', 0);
      const sizeX = getDataNumber(parent, 'sizeX', 2);
      const sizeY = getDataNumber(parent, 'sizeY', 2);
      const parentRot = computeItemBaseRotation(offsetX, offsetY, sizeX, sizeY, segments);
      const parentY = normalizeAngle(parentRot.rotateY);
      const globalY = normalizeAngle(rotationRef.current.y);
      let rotY = -(parentY + globalY) % 360;
      if (rotY < -180) rotY += 360;
      const rotX = -parentRot.rotateX - rotationRef.current.x;
      parent.style.setProperty('--rot-y-delta', `${rotY}deg`);
      parent.style.setProperty('--rot-x-delta', `${rotX}deg`);
      const refDiv = document.createElement('div');
      refDiv.className = 'item__image item__image--reference';
      refDiv.style.opacity = '0';
      refDiv.style.transform = `rotateX(${-parentRot.rotateX}deg) rotateY(${-parentRot.rotateY}deg)`;
      parent.appendChild(refDiv);

      void refDiv.offsetHeight;

      const tileR = refDiv.getBoundingClientRect();
      const mainR = mainRef.current?.getBoundingClientRect();
      const frameR = frameRef.current?.getBoundingClientRect();

      if (!mainR || !frameR || tileR.width <= 0 || tileR.height <= 0) {
        openingRef.current = false;
        focusedElRef.current = null;
        parent.removeChild(refDiv);
        unlockScroll();
        return;
      }

      originalTilePositionRef.current = { left: tileR.left, top: tileR.top, width: tileR.width, height: tileR.height };
      el.style.visibility = 'hidden';
      el.style.zIndex = 0;
      const overlay = document.createElement('div');
      overlay.className = 'enlarge';
      overlay.style.position = 'absolute';
      overlay.style.left = frameR.left - mainR.left + 'px';
      overlay.style.top = frameR.top - mainR.top + 'px';
      overlay.style.width = frameR.width + 'px';
      overlay.style.height = frameR.height + 'px';
      overlay.style.opacity = '0';
      overlay.style.zIndex = '30';
      overlay.style.willChange = 'transform, opacity';
      overlay.style.transformOrigin = 'top left';
      overlay.style.transition = `transform ${enlargeTransitionMs}ms ease, opacity ${enlargeTransitionMs}ms ease`;
      const rawSrc = parent.dataset.src || el.querySelector('img')?.src || '';
      const img = document.createElement('img');
      img.src = rawSrc;
      overlay.appendChild(img);
      viewerRef.current.appendChild(overlay);
      const tx0 = tileR.left - frameR.left;
      const ty0 = tileR.top - frameR.top;
      const sx0 = tileR.width / frameR.width;
      const sy0 = tileR.height / frameR.height;

      const validSx0 = isFinite(sx0) && sx0 > 0 ? sx0 : 1;
      const validSy0 = isFinite(sy0) && sy0 > 0 ? sy0 : 1;

      overlay.style.transform = `translate(${tx0}px, ${ty0}px) scale(${validSx0}, ${validSy0})`;

      setTimeout(() => {
        if (!overlay.parentElement) return;
        overlay.style.opacity = '1';
        overlay.style.transform = 'translate(0px, 0px) scale(1, 1)';
        rootRef.current?.setAttribute('data-enlarging', 'true');
      }, 16);
    },
    [enlargeTransitionMs, lockScroll, segments, unlockScroll]
  );

  const onTileClick = useCallback(e => {
    if (draggingRef.current || movedRef.current || performance.now() - lastDragEndAt.current < 80 || openingRef.current) return;
    openItemFromElement(e.currentTarget);
  }, [openItemFromElement]);

  const onTilePointerUp = useCallback(e => {
    if (e.pointerType !== 'touch' || draggingRef.current || movedRef.current || performance.now() - lastDragEndAt.current < 80 || openingRef.current) return;
    openItemFromElement(e.currentTarget);
  }, [openItemFromElement]);

  return (
    <div
      ref={rootRef}
      className="sphere-root"
      style={{
        ['--segments-x']: segments,
        ['--segments-y']: segments,
        ['--overlay-blur-color']: overlayBlurColor,
        ['--tile-radius']: imageBorderRadius,
        ['--enlarge-radius']: openedImageBorderRadius,
        ['--image-filter']: grayscale ? 'grayscale(1)' : 'none'
      }}
    >
      <main ref={mainRef} className="sphere-main">
        <div className="stage">
          <div ref={sphereRef} className="sphere">
            {items.map((it, i) => (
              <div
                key={`${it.x},${it.y},${i}`}
                className="item"
                data-src={it.src}
                data-offset-x={it.x}
                data-offset-y={it.y}
                data-size-x={it.sizeX}
                data-size-y={it.sizeY}
                style={{
                  ['--offset-x']: it.x,
                  ['--offset-y']: it.y,
                  ['--item-size-x']: it.sizeX,
                  ['--item-size-y']: it.sizeY
                }}
              >
                <div
                  className="item__image"
                  role="button"
                  tabIndex={0}
                  aria-label={it.alt || 'Open image'}
                  onClick={onTileClick}
                  onPointerUp={onTilePointerUp}
                >
                  <img src={it.src} draggable={false} alt={it.alt} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="overlay" />
        <div className="overlay overlay--blur" />
        <div className="edge-fade edge-fade--top" />
        <div className="edge-fade edge-fade--bottom" />

        <div className="viewer" ref={viewerRef}>
          <div ref={scrimRef} className="scrim" />
          <div ref={frameRef} className="frame" />
        </div>
      </main>
    </div>
  );
}

// --- Main ProjectDetail Component ---
export default function ProjectDetail() {
  const params = useParams();
  const slug = params?.slug;
  const project = projectDataMap[slug] || projectDataMap['product-shoot'];
  const [darkTheme, setDarkTheme] = useState(true);

  const coverContainerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(
        coverContainerRef.current,
        { width: "60%", scale: 0.9, borderRadius: "48px", opacity: 0.5 },
        {
          width: "100%", scale: 1, borderRadius: "0px", opacity: 1,
          scrollTrigger: { trigger: coverContainerRef.current, start: "top 85%", end: "top 15%", scrub: 1 }
        }
      );
    });
    return () => ctx.revert();
  }, []);

  // Consolidate and flatten all images from every category and gallery together
  const allImages = useMemo(() => {
    if (project?.categories) {
      return project.categories.flatMap(cat => cat.items || []);
    }
    return project?.gallery || [];
  }, [project]);

  return (
    <div className={` transition-colors duration-500 ${darkTheme ? 'bg-black text-white' : 'bg-white text-neutral-900'}`}>
        <main className="px-4 sm:px-6 md:px-12 lg:px-24 xl:px-40 2xl:px-52 py-12">
    

        {/* Unified Dome Gallery View */}
        <div className="min-h-screen" style={{ width: '100%', height: '650px', position: 'relative' }}>
          <DomeGallery
            images={allImages}
            fit={0.8}
            minRadius={600}
            maxVerticalRotationDeg={5}
            segments={35}
            dragDampening={2}
            grayscale={false}
            overlayBlurColor={darkTheme ? "#000000" : "#ffffff"}
          />
        </div>
      </main>



      <style jsx global>{`
        @keyframes slideUp {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up { animation: slideUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .dg-scroll-lock { overflow: hidden; }
      `}</style>
    </div>
  );
}