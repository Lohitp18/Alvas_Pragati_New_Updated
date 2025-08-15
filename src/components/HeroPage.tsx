import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Slider from 'react-slick';
import { Download } from 'lucide-react';

// Image imports
import img2 from '../images/Alvas Pragati Booklet _ 2025.jpg';
import not1 from '../images/not (1).png';
import not2 from '../images/not (2).png';

import about1 from "../images/about (1).jpg";
import about2 from "../images/about (2)2.png";
import about3 from "../images/about (3).jpg";
import about4 from "../images/about (4).jpg";
import about5 from "../images/about (5).jpg";

// Slick Carousel CSS imports
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Lucide React Icons imports
import { Search, Building2, ChevronRight, User, Phone, MessageSquare, Factory, Truck, Laptop, Landmark, Heart, Pill, Tv, ShoppingBag, HardHat, Coffee, Phone as PhoneIcon, GraduationCap } from 'lucide-react';

// --- Data Definitions ---

// Define companies data (moved outside components for better organization)
const companies = [
  // Manufacturing
  { name: 'A.O Smith India Water Products Pvt Ltd', sector: 'Manufacturing', pdf: '/Alvas-Pragati-Booklet-2025-Final.pdf' },
  { name: 'Ace Designers Ltd', sector: 'Manufacturing', pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'Ace Designers Ltd- Machining Center Division', sector: 'Manufacturing', pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'Ace Multi Axes Systems Limited', sector: 'Manufacturing', pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'Advik Hi-Tech Pvt. Ltd', sector: 'Manufacturing', pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'Agrileaf Exports Pvt Ltd', sector: 'Manufacturing', pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'Aikyam Sports Science', sector: 'Manufacturing', pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'Ajax Engineering Ltd', sector: 'Manufacturing', pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'Amrut Distilleries Private Limited', sector: 'Manufacturing', pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'Associate Decore Limited', sector: 'Manufacturing', pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'Biesse India Pvt. Ltd.', sector: 'Manufacturing', pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'BUHLER INDIA PRIVATE LIMITED', sector: 'Manufacturing', pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'Centum Electronics Limited', sector: 'Manufacturing', pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'CERATIZIT INDIA PVT LTD', sector: 'Manufacturing', pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'Ennovi Mobility Solutions India Pvt Ltd', sector: 'Manufacturing', pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'EXICOM TELE-SYSTEMS LIMITED', sector: 'Manufacturing', pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'Featherlite Products Private Limited', sector: 'Manufacturing', pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'Gassol Soultions Pvt Ltd', sector: 'Manufacturing', pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'Gleason Works India Pvt Ltd', sector: 'Manufacturing', pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'GOKUL AGRO RESOURCES LTD', sector: 'Manufacturing', pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'Himatsingka linens', sector: 'Manufacturing', pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'Honda Power Pack Energy India Pvt Ltd', sector: 'Manufacturing', pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'INDO MIM LIMITED', sector: 'Manufacturing', pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'Kirloskar Toyota Textile Machinery Pvt Ltd', sector: 'Manufacturing', pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'Labournet Services India private Limited', sector: 'Manufacturing', pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'Legion Energy Products private limited', sector: 'Manufacturing', pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'Leksa Lighting Technologies Pvt.Ltd.', sector: 'Manufacturing', pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'MadoX Technologies Pvt. Ltd.', sector: 'Manufacturing', pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'Maini Precision Products Limited', sector: 'Manufacturing', pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'Manipal Payment and Identity Solutions Limited', sector: 'Manufacturing', pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'Manipal Technologies Limited', sector: 'Manufacturing', pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'Maniranjan Diesel Sales & Service Pvt. Ltd', sector: 'Manufacturing', pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'Micro Plastics Private Limited', sector: 'Manufacturing', pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'MOTHERSON automotive', sector: 'Manufacturing', pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'Nash Energy India Pvt.Ltd', sector: 'Manufacturing', pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'Nexteer Automotive India Private Limited', sector: 'Manufacturing', pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'Nidec Industrial Automation India Private Ltd.', sector: 'Manufacturing', pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'NIXIES METERS PVT LTD', sector: 'Manufacturing', pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'Oerlikon Balzers Coating India Private Limited', sector: 'Manufacturing', pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'Paul Techno Process Pvt Ltd', sector: 'Manufacturing', pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'PLANTEK', sector: 'Manufacturing', pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'Pricol Precision Products Private Ltd.', sector: 'Manufacturing', pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'Primacy Industries Private Limited', sector: 'Manufacturing', pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'Rane Madras Limited', sector: 'Manufacturing', pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'Sansera Engineering Limited - Aerospace Division', sector: 'Manufacturing', pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'SIRI', sector: 'Manufacturing', pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'SKF Elixer India Pvt. Ltd', sector: 'Manufacturing', pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'SPACEWARE DEZIGNS LLP', sector: 'Manufacturing', pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'Sun Electric', sector: 'Manufacturing', pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'Suzlon Energy Limited', sector: 'Manufacturing', pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'Switchgear and Control Technics Pvt Ltd', sector: 'Manufacturing', pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'Tata Electronics Systems Solutions Private Limited', sector: 'Manufacturing', pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'Toyoda Gosei South India Pvt. Ltd.', sector: 'Manufacturing', pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'Toyota Industries Engine India', sector: 'Manufacturing', pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'Toyota Kirloskar Auto Parts Pvt Ltd', sector: 'Manufacturing', pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'Toyota Kirloskar Motor Pvt Limited', sector: 'Manufacturing', pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'TVS Motor Company Limited', sector: 'Manufacturing', pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'United Rubber Industries I Pvt Ltd', sector: 'Manufacturing', pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'UNO Minda Ltd Seating Division', sector: 'Manufacturing', pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'USHA ARMOUR PRIVATE LIMITED', sector: 'Manufacturing', pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'VMX HI CONNECTORS PVT LTD', sector: 'Manufacturing', pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'VOC automative india pvt ltd', sector: 'Manufacturing', pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'Volvo Group India Pvt Ltd', sector: 'Manufacturing', pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'Wagen Tunen', sector: 'Manufacturing', pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'Walkaroo International Private Limited', sector: 'Manufacturing', pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'Westtek Enterprises Private Limited', sector: 'Manufacturing', pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'KITEX', sector: 'Manufacturing', pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'Shri Ganesh Engineering Industries', sector: 'Manufacturing', pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },

  // Telecom
  { name: 'DeeNet Services Pvt Ltd', sector: 'Telecom', pdf: '../Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'DOSNET TECHNOLOGIES PRIVATE LIMITED', sector: 'Telecom', pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'Integrated Wireless Solutions', sector: 'Telecom', pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'Reliance Jio Infocomm Ltd', sector: 'Telecom', pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'Vodafoneidea Limited', sector: 'Telecom', pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },

  // Media
  { name: 'Artha WebLabs', sector: 'Media', pdf: '/alvas-pragati-frontend-main/public/Alvas-Pragati-Booklet-2025-Final.pdf' },
  { name: 'HOSADIGANTHA KANNADA DAILY', sector: 'Media', pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'Manipal Media Network Limited', sector: 'Media', pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'Metropolitan Media Company Limited', sector: 'Media', pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'Nammur express', sector: 'Media', pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'OMNiON PreMedia Private Limited', sector: 'Media', pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'SAMYUKTA KARNATAKA', sector: 'Media', pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'Spearhead Media Pvt Ltd', sector: 'Media', pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'Suddi Group of Companies', sector: 'Media', pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'The Printers Mysore Pvt. Ltd.', sector: 'Media', pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'VARTHA BHARATI', sector: 'Media', pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'VRL Media/ Vijayanad Travels', sector: 'Media', pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'Zee Entertainment Enterprises Limited', sector: 'Media', pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },

  // Logistics
  { name: 'Allacrgo Logistics Limited', sector: 'Logistics', pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'Bhavani Shipping Services I Pvt Ltd', sector: 'Logistics', pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'Flipkart', sector: 'Logistics', pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'SRI GANESH SHIPPING AGENCY', sector: 'Logistics', pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },

  // Pharmaceuticals
  { name: 'Aster Pharmacy', sector: 'Pharmaceuticals', pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'Cipla Ltd', sector: 'Pharmaceuticals', pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'HETERO', sector: 'Pharmaceuticals', pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'Jubilant Pharmova Pvt Ltd', sector: 'Pharmaceuticals', pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'Meditek India - Medorganics India Pvt. Ltd.', sector: 'Pharmaceuticals', pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'MEDORGANICS INDIA PRIVATE LIMITED', sector: 'Pharmaceuticals', pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'VASUDHA LIFE SCIENCE PVT LTD.', sector: 'Pharmaceuticals', pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },

  // Healthcare
  { name: 'Akhilasoukhya Healthcare Pvt Ltd', sector: 'Healthcare', pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'Alvas Ayurveda Medical College & Hospital', sector: 'Healthcare', pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'Apollo Home Healthcare Limited', sector: 'Healthcare', pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'Atmantan Wellness Centre', sector: 'Healthcare', pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'AtreumRamakrishna Hospital LLP', sector: 'Healthcare', openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'Clair Veda Ayur Clinic', sector: 'Healthcare', openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'Gatty Surgical', sector: 'Healthcare', openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'INDIANA HOSPITAL & HEART INSTITUTE LTD', sector: 'Healthcare', openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'Indira IVF hospital Ltd', sector: 'Healthcare', openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'JD Infolas Medcare Solutions', sector: 'Healthcare', openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'Karna Multispeciality hospital', sector: 'Healthcare', openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'KMC hospital', sector: 'Healthcare', openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'Mount Rosary Hospital', sector: 'Healthcare', openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'NAMMA HOMEOPATHY PVT LTD', sector: 'Healthcare', openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'Narayana Health, Bangalore', sector: 'Healthcare', openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'Natus women and children hospital', sector: 'Healthcare', openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'Nephroplus', sector: 'Healthcare', openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'Physio tattva', sector: 'Healthcare', openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'Prabas Vcare Health Clinic', sector: 'Healthcare', openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'SAGILITY HEALTH', sector: 'Healthcare', openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'Sakra World Hospital', sector: 'Healthcare', openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'Stairs Rehab And Fitness Private Limited', sector: 'Healthcare', openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'Star Health Insurance', sector: 'Healthcare', openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'Sudeeksha Healthcare pvt ltd', sector: 'Healthcare', openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'Synergy Physiotheraphy', sector: 'Healthcare', openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'Taurus BPO', sector: 'Healthcare', openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'Tulip Diagnostic P Ltd', sector: 'Healthcare', openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'Wockhardt Hospitals Limited', sector: 'Healthcare', openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'WohlPhysio International Pvt Ltd', sector: 'Healthcare', openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'YENEPOYA SPECIALTY HOSPITAL', sector: 'Healthcare', openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },

  // Hospitality
  { name: 'ALVAS HEALTH CENTRE', sector: 'Hospitality', openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'AMPS FACILITIES MANAGEMENT SERVICES PVT LTD', sector: 'Hospitality', openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'FORTUNE GROUP OF HOTELS', sector: 'Hospitality', openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'Goldfinch Hotel', sector: 'Hospitality', openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'INDIGO', sector: 'Hospitality', openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'Indigo', sector: 'Hospitality', openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'Royal Ritz Resort', sector: 'Hospitality', openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'SDM Institute Of Naturopathy and Yogic Science - Kshemavana', sector: 'Hospitality', openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'Taj SATS Air Catering Limited', sector: 'Hospitality', openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'The Avatar Hotel', sector: 'Hospitality', openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'THE OCEAN PEARL', sector: 'Hospitality', openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'THE RAMESHWARAM CAFE', sector: 'Hospitality', openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'THE SEAVIEW', sector: 'Hospitality', openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'The Tamara Coorg', sector: 'Hospitality', openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },

  // Construction
  { name: 'Agrima Roof and Facade systems', sector: 'Construction', openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'Bimal Buildcon pvt ltd', sector: 'Construction', openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'Expertise Company', sector: 'Construction', openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'Manipal Energy And Infratech Limited', sector: 'Construction', openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'Niketan Consultants LLP', sector: 'Construction', openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'ROHAN CORPORATION INDIA PVT LIMITED', sector: 'Construction', openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'SPACEWARE DEZIGNS', sector: 'Construction', openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'STRAECON', sector: 'Construction', openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },

  // Education/NGO
  { name: 'ALVAS EDUCATION FOUNDATION', sector: 'Education/NGO', openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'Appsndevices Technologies Pvt Ltd', sector: 'Education/NGO', openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'CHAITHANYA GURUKULA VIDHYASAMSTE', sector: 'Education/NGO', openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'GIBS', sector: 'Education/NGO', openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'Goan Institute International Consociation of Education', sector: 'Education/NGO', openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'GROW', sector: 'Education/NGO', openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'IDEAL INTERNATIONAL TECHNO SCHOOL', sector: 'Education/NGO', openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'K12 TECHNO SERVICES PVT LTD', sector: 'Education/NGO', openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'Magic Bus India Foundation', sector: 'Education/NGO', openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'Mangates Tech Solution Pvt Ltd', sector: 'Education/NGO', openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'Prosperity Origin Educational Trust POETional', sector: 'Education/NGO', openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'RASTRIYA COMPUTER SAKSHARATHA SAMITHI', sector: 'Education/NGO', openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'Reliance Foundation', sector: 'Education/NGO', openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'SHRI KALIDAS EDUCATION SOCIETY, BADAMI', sector: 'Education/NGO', openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'Tactile Education Services Pvt Ltd', sector: 'Education/NGO', openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'CHILD SUPPORT', sector: 'Education/NGO', openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },

  // IT & ITES
  { name: '247.AI CUSTOMER SUPPORT PVT LTD.', sector: 'IT&ITES', openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'Accolade Tech Solutions Private Limited', sector: 'IT&ITES', openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'Alorica', sector: 'IT&ITES', openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'Altruist Technologies Pvt. Ltd', sector: 'IT&ITES', openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'Amazon', sector: 'IT&ITES', openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'Brevera Technologies Pvt Ltd', sector: 'IT&ITES', openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'CodeCraft Technologies Pvt. Ltd', sector: 'IT&ITES', openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'Cogent E Services Limited', sector: 'IT&ITES', openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'Concentrix', sector: 'IT&ITES', openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'Data Prowess Pvt Ltd', sector: 'IT&ITES', openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'Echopeak Solution', sector: 'IT&ITES', openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'ECPL', sector: 'IT&ITES', openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'eReleGo Technologies Pvt Ltd', sector: 'IT&ITES', openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'Firstsource Solution Ltd', sector: 'IT&ITES', openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'Genisys Information System India Pvt Ltd', sector: 'IT&ITES', openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'Ileads Auxiliary services pvt ltd', sector: 'IT&ITES', openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'Infosys BPM Ltd', sector: 'IT&ITES', openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'ISON XPERIENCE', sector: 'IT&ITES', openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'Kakunje Software Private Limited', sector: 'IT&ITES', openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'Metasoft IT Solutions', sector: 'IT&ITES', openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'MobiEzy', sector: 'IT&ITES', openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'Niveus solutions Pvt Ltd', sector: 'IT&ITES', openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'Radiate E services Pvt Ltd', sector: 'IT&ITES', openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'Stellium Consulting India Pvt Ltd', sector: 'IT&ITES', openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'STOXII TECH SOLUTIONS', sector: 'IT&ITES', openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'Tech Mahindra', sector: 'IT&ITES', openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'Technotask', sector: 'IT&ITES', openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'TekChant Solutions LLP', sector: 'IT&ITES', openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'Thaniya Technologies', sector: 'IT&ITES', openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'TRADEMART MANGLORE', sector: 'IT&ITES', openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'UnifyCX', sector: 'IT&ITES', openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'VGM CONSULTANT LTD', sector: 'IT&ITES', openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'Winman Software India LLP', sector: 'IT&ITES', openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'BREVERA', sector: 'IT&ITES', openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'UNIFYCX', sector: 'IT&ITES', openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'INVENGER', sector: 'IT&ITES', openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },

  // Banking and Financial Services
  { name: 'ANZ', sector: 'Banking and Financial Services', openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'ARJUNA RESEARCH AND FINANCIAL SERVICES', sector: 'Banking and Financial Services', openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'AXIS Bank', sector: 'Banking and Financial Services', openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'Bajaj Allianz Life Insurance Company', sector: 'Banking and Financial Services', openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'Bharat financial inclusion ltd', sector: 'Banking and Financial Services', openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'BIG PAYROLLS SOLUTION PVT LTD', sector: 'Banking and Financial Services', openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'BSS Microfinance Pvt Ltdb', sector: 'Banking and Financial Services', openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'Can Fin Homes Ltd.', sector: 'Banking and Financial Services', openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'CreditAccess Grameen ltd', sector: 'Banking and Financial Services', openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'DOCTORS AND ALLIED PROFESSIONALS CREDIT COOPERATIVE SOCIETY', sector: 'Banking and Financial Services', openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'Edelweiss life insurance co ltd', sector: 'Banking and Financial Services', openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'Equitas Small Finance Bank', sector: 'Banking and Financial Services', openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'HDB Financial Services', sector: 'Banking and Financial Services', openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'HDFC Bank', sector: 'Banking and Financial Services', openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'HDFC BANK LTD', sector: 'Banking and Financial Services', openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'HDFC Life', sector: 'Banking and Financial Services', openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'I PROCESS SERIVICES INDIA LTD', sector: 'Banking and Financial Services', openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'Kambala Solutions Pvt Ltd', sector: 'Banking and Financial Services', openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'Kotak Mahindra Bank', sector: 'Banking and Financial Services', openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'Mahindra Finance ltd', sector: 'Banking and Financial Services', openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'Muthoot Finance ltd', sector: 'Banking and Financial Services', openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'Muthoot Microfin Ltd', sector: 'Banking and Financial Services', openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'Oracle', sector: 'Banking and Financial Services', openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'SBI CAP SECURITIES LTD', sector: 'Banking and Financial Services', openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'SBI LIFE INSURANCE', sector: 'Banking and Financial Services', openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'SFL', sector: 'Banking and Financial Services', openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'SHRI KALIDAS JANASEVA SOUHARDA CREDIT CO OP LTD, BADAMI', sector: 'Banking and Financial Services', openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'SHRIRAM LIFE INSURANCE CO', sector: 'Banking and Financial Services', openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'SMFG India Credit', sector: 'Banking and Financial Services', openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'ST.MILAGRES CREDIT SOUHARDHA CO-OPERATIVE SOCIETY LTD,KARWAR', sector: 'Banking and Financial Services', openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'TVS TS', sector: 'Banking and Financial Services', openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'Tyger Capital', sector: 'Banking and Financial Services', openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'Udupi Syndicate Credit Souhardha Co-operative Soceity Ltd Udupi', sector: 'Banking and Financial Services', openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'VINAMRA MANAGEMENT PVT LTD', sector: 'Banking and Financial Services', openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: 'HDFC', sector: 'Banking and Financial Services', openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },

  { name: "ABHARAN MOTORS PVT LTD", sector: "Sales and Retail", openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: "Advaith Aerospace Pvt Ltd", sector: "Sales and Retail", openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: "Advaith Motors Pvt Ltd", sector: "Sales and Retail", openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: "Alembic Pharma", sector: "Sales and Retail", openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: "AML Motors Pvt Ltd ASHOK LEYLAND", sector: "Sales and Retail", openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: "ARTHA HONDA", sector: "Sales and Retail", openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: "Arvind Motors Private Limited", sector: "Sales and Retail", openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: "Arvind Motors Pvt Ltd", sector: "Sales and Retail", openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: "AUTOMATRIX", sector: "Sales and Retail", openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: "BHARATH AUTO CARS PVT LTD", sector: "Sales and Retail", openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: "Bigbasket", sector: "Sales and Retail", openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: "Blue Bird Data Solutions Pvt Ltd", sector: "Sales and Retail", openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: "Bolas Agro Private Limited", sector: "Sales and Retail", openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: "Cauvery Motors Pvt Ltd", sector: "Sales and Retail", openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: "Cultfit", sector: "Sales and Retail", openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: "Decathlon sports india", sector: "Sales and Retail", openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: "Dufry India Retail Pvt. Ltd.", sector: "Sales and Retail", openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: "DWARAKA CORPORATION PVT LTD", sector: "Sales and Retail", openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: "Fernandes group", sector: "Sales and Retail", openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: "GBMT STRUCTURAL STEEL MFG-UAE", sector: "Sales and Retail", openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: "HANGYO ICECREAMS PCT. LTD.", sector: "Sales and Retail", openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: "House of Anita Dongre", sector: "Sales and Retail", openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: "IQMIST PRIVATE LIMITED", sector: "Sales and Retail", openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: "JOYALUKKAS INDIA LTD", sector: "Sales and Retail", openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: "Jubilant Motorworks Private Limited", sector: "Sales and Retail", openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: "Just dial", sector: "Sales and Retail", openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: "Kalyan Jewellers India Limited", sector: "Sales and Retail", openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: "Kanchana Automobiles Pvt Limited ,Manglore,Udupi .", sector: "Sales and Retail", openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: "Karnataka Agencies", sector: "Sales and Retail", openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: "Kumble Solar Energy Solution Pvt. Ltd", sector: "Sales and Retail", openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: "Lenskart", sector: "Sales and Retail", openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: "LIFE LINE FEEDS INDIA PVT LTD", sector: "Sales and Retail", openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: "Lifestyle International pvt ltd , Landmark", sector: "Sales and Retail", openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: "Mandovi Motors private Limied", sector: "Sales and Retail", openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: "Maroor Group Of Companies", sector: "Sales and Retail", openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: "MATRIX HONDA", sector: "Sales and Retail", openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: "Nandi Toyota Motor World Pvt Ltd", sector: "Sales and Retail", openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: "Nobroker", sector: "Sales and Retail", openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: "Nuon Connect Pvt. Ltd.", sector: "Sales and Retail", openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: "Pai International Electronics Ltd", sector: "Sales and Retail", openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: "Prakash Retail Pvt Ltd- Harsha", sector: "Sales and Retail", openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: "RELIABLE ENTERPRISES", sector: "Sales and Retail", openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: "Reliance Retail Ltd - Trends", sector: "Sales and Retail", openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: "Renault Mangalore", sector: "Sales and Retail", openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: "ROYAL ENFIELD - SHRISH MOTORS LLP", sector: "Sales and Retail", openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: "Sangeetha Mobiles PVT LTD", sector: "Sales and Retail", openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: "SAYA ENTERPRISES", sector: "Sales and Retail", openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: "SHROFF EXPERIA", sector: "Sales and Retail", openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: "SMART OWL EDUCATION PRIVATE LIMITED/CODEYOUNG", sector: "Sales and Retail", openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: "Spar Max Hypermarket India Pvt ltd", sector: "Sales and Retail", openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: "Sulthan Diamonds And Gold", sector: "Sales and Retail", openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: "Sundaram Motors- Mercedes Benz", sector: "Sales and Retail", openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: "SUPREME TECH ELEVATORS PVT LTD", sector: "Sales and Retail", openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: "SURAKSHAA CAR CARE", sector: "Sales and Retail", openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: "Swadeshi food and beverages", sector: "Sales and Retail", openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: "Tafe Access limited", sector: "Sales and Retail", openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: "TANIYA MOTORS", sector: "Sales and Retail", openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: "Trescon", sector: "Sales and Retail", openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: "Trident Automobile Pvt Llt", sector: "Sales and Retail", openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: "United Toyota", sector: "Sales and Retail", openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: "V-Trans India Ltd.", sector: "Sales and Retail", openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: "VK Furniture & Electronics", sector: "Sales and Retail", openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' },
  { name: "ZEPTO", sector: "Sales and Retail", openings: 0, pdf: '/Pragati_Results/Alvas-Pragati-Booklet-2025-Final-.pdf' }
];

// This `sectors` array is used for the dropdown options and the Sector Grid Buttons.
const sectors = [
  "Media",
  "Manufacturing",
  "Telecom",
  "Sales and Retail",
  "Banking and Financial Services",
  "IT&ITES",
  "Healthcare",
  "Pharmaceuticals",
  "Education/NGO",
  "Hospitality",
  "Construction",
  "Logistics",
];

// This `structuredSectors` array defines the sectors with their icons, paths, and colors for the visual buttons.
const structuredSectors = [
  { name: 'Manufacturing', path: '/manufacture', icon: Factory, color: 'bg-slate-600 hover:bg-slate-700' },
  { name: 'Logistics', path: '/logistics', icon: Truck, color: 'bg-gray-400 hover:bg-gray-500' },
  { name: 'IT&ITES', path: '/it-ites', icon: Laptop, color: 'bg-gray-400 hover:bg-gray-500' },
  { name: 'Banking and Financial Services', path: '/banking', icon: Landmark, color: 'bg-blue-500 hover:bg-blue-600' },
  { name: 'Healthcare', path: '/healthcare', icon: Heart, color: 'bg-pink-500 hover:bg-pink-600' },
  { name: 'Pharmaceuticals', path: '/pharamautecals', icon: Pill, color: 'bg-green-500 hover:bg-green-600' },
  { name: 'Media', path: '/media', icon: Tv, color: 'bg-red-500 hover:bg-red-600' },
  { name: 'Sales and Retail', path: '/retail', icon: ShoppingBag, color: 'bg-yellow-500 hover:bg-yellow-600' },
  { name: 'Construction', path: '/construction', icon: HardHat, color: 'bg-orange-500 hover:bg-orange-600' },
  { name: 'Hospitality', path: '/hospital', icon: Coffee, color: 'bg-gray-400 hover:bg-gray-500' },
  { name: 'Telecom', path: '/telecom', icon: PhoneIcon, color: 'bg-blue-600 hover:bg-blue-700' },
  { name: 'Education/NGO', path: '/education', icon: GraduationCap, color: 'bg-blue-500 hover:bg-blue-600' },
];

const sectorData = [
  {
    sector: "Manufacturing Sector",
    highlights: [
      "70 companies participating",
      "1000+ ITI jobs, 1500+ Diploma jobs",
      "22 companies: 200 vacancies for Mechanical Engineering",
      "Tata Electronics: Female candidates encouraged",
    ],
    companies: [
      "Toyota Kirloskar Motor Pvt. Limited",
      "Buhler India Pvt Ltd",
      "Volvo Group India Pvt Ltd",
      "Biesse India Pvt Ltd",
      "Exicom Tele-Systems Ltd",
      "Toyota Kirloskar Auto Parts Pvt Ltd",
      "Ace Designers Ltd- MCD",
      "Kirloskar Toyota Textile Machinery Pvt Ltd",
      "Ajax Engineering Ltd",
      "Bhavani Shipping",
    ]
  },
  {
    sector: "LOGISTICS SECTOR ",
    highlights: [
      "Mumbai based All Cargo logistics & Bhavani Shipping along with Ganesh shipping are participating from logistics sector",
      " Flipkart is also participating in logistics sector ",
    ],
  },
  {
    sector: "IT&ITES Sector", // Corrected to match data and dropdown
    highlights: [
      "125 core IT openings across 10 companies",
      "Opportunities in Mangalore and Bangalore",
    ],
    companies: ["Niveus Solutions", "Codecraft", "Winman", "Kakunje Software"],
  },
  {
    sector: "ITES Sector", // This seems like a subset of IT&ITES or a separate category, adjusted for consistency.
    highlights: [
      "3000+ jobs from 24 companies",
      "45+ core IT, 1000+ non-core roles for BTech students",
      "20 HR roles available",
    ],
    companies: [
      "Infosys BPM",
      "Amazon",
      "First Source",
      "24X7.ai",
      "Concentrix",
      "Sagility Health",
      "UnifyCX",
    ]
  },
  {
    sector: "BFSI Sector",
    highlights: [
      "2500+ jobs across 30 companies",
      "Targeting BBM, BCom, MBA, MCom",
      "500+ MBA & MCom jobs",
    ],
    companies: [
      "ANZ",
      "HDFC Bank",
      "Kotak Mahindra Bank",
      "AXIS Bank",
      "Mahindra Finance",
      "Eqitas Small Finance Bank",
    ],
  },
  {
    sector: "Healthcare Sector",
    highlights: [
      "2000+ jobs in nursing, para-medical, hospital admin, physiotherapy",
      "750+ nursing, 300+ para-medical, 50+ physio/admin roles",
    ],
    companies: [
      "Narayana Hrudayalaya",
      "Wockhardt ",
      "Apollo Homecare",
      "People Tree Hospital",
      "Sakra World Hospital",
      "Indira Hospital",
    ],
  },
  {
    sector: "Pharma Sector",
    highlights: [
      "250+ jobs",
      "50+ MPharma/MSc Chemistry roles",
      "60+ BSc, 120+ Diploma opportunities",
    ],
    companies: [
      "Cipla",
      "Hetero",
      "Jubiliant Pharmova Ltd",
      "Medorganics India Pvt Ltd",
      "Meditek India",
      "Vasudha Life Sciences",
    ],
  },
  {
    sector: "Media Sector",
    highlights: [
      "180+ openings in 10+ companies",
      "Wide roles: Graphic Designer, Reporter, Video Editor, Translator, Social Media, etc.",
      "Openings in metro cities and local areas",
    ],
    companies: [
      " Zee Entertainment",
      "The Mysore Printers Pvt. Ltd",
      "Metropolitan Media Company ",
      "Manipal Media Network ",
      "VRL Media",
      "Vartha Bharati",
      "Hosdiganta",
      "News Karnataka",
    ],
  },
  {
    sector: "Sales & Retail Sector",
    highlights: [
      "4500+ job openings from 57 companies",
      "CODEYOUNG leads with 120+ high-paying roles (₹5–9 LPA)",
    ],
    companies: [
      "CODEYOUNG",
      "Bigbasket",
      "Reliance Retail Ltd - Trends",
      "Decathlon Sports India",
      "JUST DIAL",
      "CULTFIT",
      "Lenskart",
      " Hangyo",
      "Kalyan Jewelers",
      "Sangeetha Mobiles",
    ],
  },
  {
    sector: "Construction Sector",
    highlights: [
      "400+ job openings from 8 companies",
      "Roles from SSLC to M.Tech (Structural)",
      "Vacancies for Civil & Mech Engineers, Diploma, MBA, etc.",
    ],
    companies: [
      "Rohan Corporation India Pvt Limited",
      "Expertise Company",
      "Niketan Consultants LLP",
      "Bimal Buildcon Pvt Ltd",
      "Straecon",
      "Agrima Roof and Facad Systems",
      "Manipal Energy and Infratech limited,",
      "Spaceware Dezines",
    ],
  },
  {
    sector: "Hospitality Sector",
    highlights: [
      "240+ jobs from 9 top hospitality companies",
      "Roles for Hotel Management, BCom, BCA, BSc, MCom, BA, etc.",
    ],
    companies: [
      "Fortune Group of Hotels UAE",
      "Taj Sats Air Catering Limited",
      "the Avatar Hotel",
      " Royal Ritz Hotels",
      "The Rameshwaram Café",
      "Goldfinch Hotels",
      "Amps Facilities Management Services",
      "Tamara Coorg",
    ],
  },
];

const colorCategories: { [key: string]: string } = {
  'SSLC': 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSkCwOkgwKfG4mqBfny-m0CtcahbfFuZ2p7G58WHHIS9-UUiKto6Hx4vO381oazgu9A_6NXiTlwmL5I/pubhtml?gid=1907999933&single=true',
  'PUC': 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSkCwOkgwKfG4mqBfny-m0CtcahbfFuZ2p7G58WHHIS9-UUiKto6Hx4vO381oazgu9A_6NXiTlwmL5I/pubhtml?gid=124753179&single=true',
  'ITI': 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSkCwOkgwKfG4mqBfny-m0CtcahbfFuZ2p7G58WHHIS9-UUiKto6Hx4vO381oazgu9A_6NXiTlwmL5I/pubhtml?gid=482071248&single=true',
  'Any Degree': 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSkCwOkgwKfG4mqBfny-m0CtcahbfFuZ2p7G58WHHIS9-UUiKto6Hx4vO381oazgu9A_6NXiTlwmL5I/pubhtml?gid=605232992&single=true',
  'Any PG': 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSkCwOkgwKfG4mqBfny-m0CtcahbfFuZ2p7G58WHHIS9-UUiKto6Hx4vO381oazgu9A_6NXiTlwmL5I/pubhtml?gid=232897252&single=true',
  'BPHARM/MPHARMA': 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSkCwOkgwKfG4mqBfny-m0CtcahbfFuZ2p7G58WHHIS9-UUiKto6Hx4vO381oazgu9A_6NXiTlwmL5I/pubhtml?gid=1305997296&single=true',
  'BSC/MSC': 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSkCwOkgwKfG4mqBfny-m0CtcahbfFuZ2p7G58WHHIS9-UUiKto6Hx4vO381oazgu9A_6NXiTlwmL5I/pubhtml?gid=1799760712&single=true',
  'BCOM/BBM': 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSkCwOkgwKfG4mqBfny-m0CtcahbfFuZ2p7G58WHHIS9-UUiKto6Hx4vO381oazgu9A_6NXiTlwmL5I/pubhtml?gid=1516542570&single=true',
  'MCom/MBA': 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSkCwOkgwKfG4mqBfny-m0CtcahbfFuZ2p7G58WHHIS9-UUiKto6Hx4vO381oazgu9A_6NXiTlwmL5I/pubhtml?gid=1037070028&single=true',
  'BE/B.TECH': 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSkCwOkgwKfG4mqBfny-m0CtcahbfFuZ2p7G58WHHIS9-UUiKto6Hx4vO381oazgu9A_6NXiTlwmL5I/pubhtml?gid=992915437&single=true',
  'DIPLOMA': 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSkCwOkgwKfG4mqBfny-m0CtcahbfFuZ2p7G58WHHIS9-UUiKto6Hx4vO381oazgu9A_6NXiTlwmL5I/pubhtml?gid=1977029937&single=true',
  'MEDICAL/': 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSkCwOkgwKfG4mqBfny-m0CtcahbfFuZ2p7G58WHHIS9-UUiKto6Hx4vO381oazgu9A_6NXiTlwmL5I/pubhtml?gid=1673992020&single=true',
};

const colorCategoriesStyling: { [key: string]: { color: string; textColor: string; kannada: string } } = {
  'SSLC': { color: 'from-red-500 to-red-700', textColor: 'text-white', kannada: 'ಎಸ್‌ಎಸ್‌ಎಲ್‌ಸಿ' },
  'PUC': { color: 'from-red-500 to-red-700', textColor: 'text-white', kannada: 'ಪಿಯುಸಿ' },
  'ITI': { color: 'from-yellow-400 to-orange-500', textColor: 'text-black', kannada: 'ಐಟಿಐ' },
  'DIPLOMA': { color: 'from-pink-400 to-pink-600', textColor: 'text-white', kannada: 'ಡಿಪ್ಲೊಮಾ' },
  'MEDICAL/': { color: 'from-gray-200 to-gray-400', textColor: 'text-black', kannada: 'Paramedicals/Nursing/ಹೆಲ್ತ್‌ಕೇರ್' },
  'BE/B.TECH': { color: 'from-blue-400 to-blue-600', textColor: 'text-white', kannada: 'ಬಿಇ / ಬಿ.ಟೆಕ್' },
  'Any Degree': { color: 'from-green-400 to-green-600', textColor: 'text-white', kannada: 'ಯಾವುದೇ ಪದವೀ' },
  'Any PG': { color: 'from-yellow-300 to-yellow-500', textColor: 'text-black', kannada: 'ಸ್ನಾತಕೋತ್ತರರು' },
  'BPHARM/MPHARMA': { color: 'from-gray-200 to-gray-400', textColor: 'text-black', kannada: '' },
  'BSC/MSC': { color: 'from-gray-200 to-gray-400', textColor: 'text-black', kannada: '' },
  'BCOM/BBM': { color: 'from-gray-200 to-gray-400', textColor: 'text-black', kannada: '' },
  'MCom/MBA': { color: 'from-gray-200 to-gray-400', textColor: 'text-black', kannada: '' }
};

// This maps sector names to their respective Google Sheet URLs.
const sectorUrlsMap: { [key: string]: string } = {
  'Manufacturing': 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRsKFCNV_MR_7RWhf7iyWTxJ2MNfIKWP8eUy58SQ485PN2sroOH6rcGIMlRedjP9ulStrJjSArQ_qPb/pubhtml?gid=1516542570&single=true',
  'Logistics': 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRsKFCNV_MR_7RWhf7iyWTxJ2MNfIKWP8eUy58SQ485PN2sroOH6rcGIMlRedjP9ulStrJjSArQ_qPb/pubhtml?gid=1799760712&single=true',
  'IT&ITES': 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRsKFCNV_MR_7RWhf7iyWTxJ2MNfIKWP8eUy58SQ485PN2sroOH6rcGIMlRedjP9ulStrJjSArQ_qPb/pubhtml?gid=1305997296&single=true',
  'Banking and Financial Services': 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRsKFCNV_MR_7RWhf7iyWTxJ2MNfIKWP8eUy58SQ485PN2sroOH6rcGIMlRedjP9ulStrJjSArQ_qPb/pubhtml?gid=1907999933&single=true',
  'Healthcare': 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRsKFCNV_MR_7RWhf7iyWTxJ2MNfIKWP8eUy58SQ485PN2sroOH6rcGIMlRedjP9ulStrJjSArQ_qPb/pubhtml?gid=605232992&single=true',
  'Pharmaceuticals': 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRsKFCNV_MR_7RWhf7iyWTxJ2MNfIKWP8eUy58SQ485PN2sroOH6rcGIMlRedjP9ulStrJjSArQ_qPb/pubhtml?gid=992915437&single=true',
  'Media': 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRsKFCNV_MR_7RWhf7iyWTxJ2MNfIKWP8eUy58SQ485PN2sroOH6rcGIMlRedjP9ulStrJjSArQ_qPb/pubhtml?gid=1037070028&single=true',
  'Sales and Retail': 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRsKFCNV_MR_7RWhf7iyWTxJ2MNfIKWP8eUy58SQ485PN2sroOH6rcGIMlRedjP9ulStrJjSArQ_qPb/pubhtml?gid=1977029937&single=true',
  'Construction': 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRsKFCNV_MR_7RWhf7iyWTxJ2MNfIKWP8eUy58SQ485PN2sroOH6rcGIMlRedjP9ulStrJjSArQ_qPb/pubhtml?gid=124753179&single=true',
  'Hospitality': 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRsKFCNV_MR_7RWhf7iyWTxJ2MNfIKWP8eUy58SQ485PN2sroOH6rcGIMlRedjP9ulStrJjSArQ_qPb/pubhtml?gid=232897252&single=true',
  'Telecom': 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRsKFCNV_MR_7RWhf7iyWTxJ2MNfIKWP8eUy58SQ485PN2sroOH6rcGIMlRedjP9ulStrJjSArQ_qPb/pubhtml?gid=1673992020&single=true',
  'Education/NGO': 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRsKFCNV_MR_7RWhf7iyWTxJ2MNfIKWP8eUy58SQ485PN2p7G58WHHIS9-UUiKto6Hx4vO381oazgu9A_6NXiTlwmL5I/pubhtml?gid=482071248&single=true'
};

const notificationSliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  responsive: [
    { breakpoint: 1024, settings: { slidesToShow: 2 } },
    { breakpoint: 640, settings: { slidesToShow: 1 } },
  ],
};

const notifications = [
  { id: 1, image: not1, alt: 'Notification 1' },
  { id: 2, image: not2, alt: 'Notification 2' },
  { id: 3, image: not1, alt: 'Notification 3' },
  { id: 4, image: not2, alt: 'Notification 4' },
  { id: 5, image: not1, alt: 'Notification 5' },
  { id: 6, image: not2, alt: 'Notification 6' },
];

// --- CompanyList Component ---

interface Company {
  name: string;
  sector: string;
  pdf: string;
  openings?: number; // Optional, as some entries don't have it
}

interface CompanyListProps {
  companies: Company[];
  sectors: string[]; // Pass the sectors array for the dropdown
}

const CompanyList: React.FC<CompanyListProps> = ({ companies, sectors }) => {
  const [companySearch, setCompanySearch] = useState("");
  const [sectorSearch, setSectorSearch] = useState("");
  const [showAllCompanies, setShowAllCompanies] = useState(false);

  const filteredCompanies = companies.filter((company) => {
    const matchesName = company.name
      .toLowerCase()
      .includes(companySearch.toLowerCase());
    const matchesSector = sectorSearch
      ? company.sector.toLowerCase() === sectorSearch.toLowerCase()
      : true;
    return matchesName && matchesSector;
  });

  return (
    <section className="bg-white rounded-xl shadow-lg p-8 mt-16">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 font-serif">
        Alva's Pragati-2025 Selected and Shortlisted Results
      </h2>

      {/* Search Bars */}
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        {/* Company Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by company name..."
            value={companySearch}
            onChange={(e) => setCompanySearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
        </div>

        {/* Sector Dropdown */}
        <div className="relative">
          <select
            value={sectorSearch}
            onChange={(e) => setSectorSearch(e.target.value)}
            className="w-full pl-4 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          >
            <option value="">Select sector...</option>
            {sectors.map((sector, idx) => (
              <option key={idx} value={sector}>
                {sector}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Companies List */}
      <div className="space-y-4"> {/* Increased spacing */}
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Companies ({filteredCompanies.length})
        </h3>

        {(companySearch || sectorSearch || showAllCompanies
          ? filteredCompanies
          : filteredCompanies.slice(0, 5)
        ).map((company, index) => (
          <div
            key={index}
            className="group bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md hover:border-blue-200 transition-all duration-200"
          >
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex-1">
                <h4 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {company.name}</h4>

                <div className="flex items-center gap-4 mt-2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    {company.sector}
                  </span>
                  {company.openings !== undefined && ( // Check if openings exists
                    <span className="text-sm text-gray-600">
                      {company.openings} open positions
                    </span>
                  )}
                </div>
              </div>

              {/* View PDF button */}
              {company.pdf && (
                <a
                  href={company.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
                >
                  View PDF
                </a>
              )}
            </div>
          </div>
        ))}

        {filteredCompanies.length === 0 && (
          <div className="text-center py-12">
            <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">
              No companies found matching your search
            </p>
          </div>
        )}

        {/* Show All / Show Less Button */}
        {(!companySearch && !sectorSearch && filteredCompanies.length > 5) && (
          <div className="text-center mt-6">
            <button
              onClick={() => setShowAllCompanies(!showAllCompanies)}
              className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              {showAllCompanies ? "Show Less" : "Show All Companies"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

// --- FeedbackForm Component ---
interface FeedbackFormData {
  name: string;
  phone: string;
  message: string;
}

const FeedbackForm: React.FC = () => {
  const [feedbackForm, setFeedbackForm] = useState<FeedbackFormData>({
    name: "",
    phone: "",
    message: "",
  });

  const handleFeedbackSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch("https://alvas-pragati-new-updated.vercel.app/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(feedbackForm),
      });

      if (res.ok) {
        alert("✅ Feedback submitted successfully!");
        setFeedbackForm({ name: "", phone: "", message: "" });
      } else {
        alert("❌ Failed to submit feedback");
      }
    } catch (err) {
      console.error(err);
      alert("❌ Error submitting feedback");
    }
  };

  return (
    <form onSubmit={handleFeedbackSubmit} className="space-y-4">
      {/* Name */}
      <div className="relative">
        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Full Name"
          required
          maxLength={20} // enforce 20 chars
          value={feedbackForm.name}
          onChange={(e) =>
            setFeedbackForm({ ...feedbackForm, name: e.target.value })
          }
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
        />
      </div>

      {/* Phone */}
      <div className="relative">
        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="tel"
          placeholder="Phone Number"
          required
          maxLength={10} // enforce 10 digits
          pattern="\d{10}" // must be exactly 10 numbers
          value={feedbackForm.phone}
          onChange={(e) => {
            const onlyNums = e.target.value.replace(/\D/g, ""); // remove non-numbers
            if (onlyNums.length <= 10) {
              setFeedbackForm({ ...feedbackForm, phone: onlyNums });
            }
          }}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
        />
      </div>

      {/* Message */}
      <div className="relative">
        <MessageSquare className="absolute left-3 top-4 text-gray-400 w-5 h-5" />
        <textarea
          placeholder="Message"
          required
          value={feedbackForm.message}
          onChange={(e) => {
            const lines = e.target.value.split("\n");
            if (lines.length <= 40) {
              setFeedbackForm({ ...feedbackForm, message: e.target.value });
            }
          }}
          rows={5}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 resize-y"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
      >
        Send Message
      </button>
    </form>
  );
};



// --- HeroPage Component ---

const HeroPage: React.FC = () => {
  // Removed duplicated feedbackForm state and handleFeedbackSubmit from HeroPage
  // as the FeedbackForm component now handles its own state and submission.

  const circleRef = useRef<HTMLDivElement>(null);
  const [radius, setRadius] = useState(150); // This state isn't used in the provided JSX for circleRef.
  // It's still here as it was in your original code, but if not used, consider removing.

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      if (circleRef.current) {
        const width = circleRef.current.offsetWidth;
        setRadius(width / 2.5);
      }
    });
    if (circleRef.current) resizeObserver.observe(circleRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Define sectorSliderSettings here
  const sectorSliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    cssEase: "linear",
    adaptiveHeight: true,
    responsive: [
      { breakpoint: 768, settings: { slidesToShow: 1 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  // Define images array (assuming it's meant for the "About" section carousel)
  const images = [about1, about2, about3, about4, about5];

  const navigate = useNavigate();

  return (
    <main
      style={{
        backgroundImage: "url('/images/not (1).png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      className="relative text-gray-900 min-h-screen py-2 pt-16"
    >
      <div className="max-w-6xl mx-auto px-6 py-8 space-y-12">
        {/* Company Results Section */}
        <CompanyList companies={companies} sectors={sectors} />

        {/* --- Feedback Section --- */}
        <section className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-serif font-extrabold text-gray-900 mb-2">Give Your Valuable Feedback on Alva's Pragati-2025</h2>
          <p className="text-gray-600 mb-8">We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>

          {/* Corrected: Render the FeedbackForm component */}
          <FeedbackForm />
        </section>

        {/* --- Sector Grid Buttons (Position Openings) --- */}
        <section className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2 font-serif">Position openings </h2>
          <p className="text-gray-600 mb-8">
            Explore job opportunities across various industries and find your perfect career match.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {structuredSectors.map((sector, index) => { // Using structuredSectors here
              const IconComponent = sector.icon;
              return (
                <button
                  key={index}
                  onClick={() => navigate(sector.path)}
                  className={`${sector.color} text-white px-6 py-4 rounded-full font-semibold transition-all duration-200 flex items-center justify-center gap-3 text-sm hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-md hover:shadow-lg`}
                >
                  <IconComponent className="w-5 h-5" />
                  {sector.name}
                </button>
              );
            })}
          </div>
        </section>

        {/* --- Qualification Section (Circular Buttons) --- */}
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <section
            id="qualification"
            className="w-full max-w-md mx-auto grid grid-cols-2 gap-4 px-4 mt-8 md:mt-32 mb-16"
          >
            <h3 className="text-xl font-serif font-bold text-gray-800 col-span-2 text-center">Select your qualification/</h3>
            <p className="text-gray-600 mb-6 text-center font-serif font-bold col-span-2">ವಿದ್ಯಾರ್ಹತೆ ಆಯ್ಕೆ ಮಾಡಿ</p>
            {Object.entries(colorCategories).map(([label, url], index) => {
              const styling = colorCategoriesStyling[label];
              return (
                <button
                  key={index}
                  onClick={() => {
                    window.open(url, "_self");
                  }}
                  className={`
                    w-full h-12 sm:h-14 px-4
                    rounded-l-full rounded-r-full bg-gradient-to-r ${styling.color} ${styling.textColor}
                    border-2 border-black
                    text-[10px] sm:text-sm font-extrabold
                    shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300
                    flex flex-col items-center justify-center text-center break-words whitespace-normal
                  `}
                >
                  <span className="leading-tight">{label}</span>
                  <span className="text-[8px] sm:text-xs opacity-80">{styling.kannada}</span>
                </button>
              );
            })}
          </section>

          {/* This section appears to be a duplicate of the Sector Grid Buttons above, but with different URLs.
          I'm keeping it as is based on the original structure, but you might want to consolidate or clarify
          its purpose if it's meant to be different from "Position openings".
          Renamed 'sectors' object to 'sectorUrlsMap' to avoid conflict.
          */}
          <section id="jobs" className="w-full max-w-[600px] mx-auto px-4 py-6 flex flex-col justify-start items-center md:pt-24">
            <h3 className="text-xl font-serif font-bold text-gray-800 mb-2 text-center">Select your sector/</h3>
            <p className="text-gray-600 mb-6 text-center font-serif font-bold">ನಿಮ್ಮ ವಲಯವನ್ನು ಆಯ್ಕೆಮಾಡಿ</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6 w-full px-2">
              {Object.entries(sectorUrlsMap).map(([label, url], index) => { // Using sectorUrlsMap here
                const sectorInfo = structuredSectors.find(s => s.name === label); // Find matching icon/color
                const IconComponent = sectorInfo ? sectorInfo.icon : null;

                const color = sectorInfo ? sectorInfo.color : 'bg-gray-500 hover:bg-gray-600';
                const textColor = (color.includes('white') || color.includes('gray-200')) ? 'text-black' : 'text-white';

                return (
                  <button
                    key={index}
                    onClick={() => {
                      window.open(url, "_self");
                    }}
                    className={`flex items-center justify-center space-x-2 px-4 py-4 min-h-[60px] rounded-full ${color} ${textColor} border-2 border-black shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300`}
                  >
                    {IconComponent && <IconComponent className="w-5 h-5" />}
                    <span className="text-base font-semibold">{label}</span>
                  </button>
                );
              })}
            </div>
          </section>
        </div>

        <hr className="my-8 border-t-4 border-gray-300 w-4/5 mx-auto" />

        {/* Notification Slider */}
        <section
          id="notification"
          className="max-w-7xl mx-auto px-4 pt-8 pb-8 md:pt-12 md:pb-12 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 -z-10" />

          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 font-serif tracking-tight mb-3">
              🔔 Notifications / ಸೂಚನೆಗಳು
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Stay up-to-date with sector-wise highlights and company arrivals for Alva’s Pragati 2025.
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-md border border-gray-200 shadow-xl rounded-3xl px-6 py-10 md:px-12 lg:px-20">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-800 mb-8">
              🎯 Sector-Wise Highlights – Alva’s Pragati 2025
            </h2>

            <Slider {...sectorSliderSettings}>
              {sectorData.map((sector, index) => (
                <div key={index} className="px-2 md:px-3">
                  <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6 min-h-[280px] md:min-h-[320px] flex flex-col justify-between hover:shadow-2xl transition-all duration-300">
                    <div>
                      <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-blue-700 mb-2 md:mb-3 flex items-center gap-2">
                        📌 {sector.sector}
                      </h3>

                      <ul className="list-disc list-inside space-y-1 text-gray-700 text-xs md:text-sm leading-relaxed">
                        {sector.highlights.map((point, idx) => (
                          <li key={idx} className="transition hover:text-blue-600">
                            {point}
                          </li>
                        ))}
                      </ul>

                      {sector.companies && sector.companies.length > 0 && (
                        <div className="mt-4">
                          <h4 className="font-semibold text-sm text-purple-700 mb-2">
                            🔹 Key Companies:
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {sector.companies.map((company, cidx) => (
                              <span
                                key={cidx}
                                className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-medium hover:bg-purple-200 transition"
                              >
                                {company}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </section>

        <hr className="my-8 border-t-4 border-gray-300 w-4/5 mx-auto" />

        {/* Booklet Download */}
        <section id="booklet" className="p-6 mb-8 text-center font-serif font-bold">
          <img src={img2} alt="Alva's Pragati 2025" className="mx-auto mb-4 rounded-lg w-full max-w-md" />
          <a
            href="/Alvas-Pragati-Booklet-2025-Final.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-red-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            <Download size={20} className="mr-2" />
            View Alva's Pragati 2025 Booklet
          </a>
        </section>

        <hr className="my-8 border-t-4 border-gray-300 w-4/5 mx-auto" />

        {/* About Section */}
        <section id="about" className="max-w-7xl mx-auto px-4 mb-12">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="relative w-full h-80 md:h-96 overflow-hidden rounded-lg">
              {images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Slide ${index}`}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                    index === currentImageIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  }`}
                />
              ))}
            </div>
            <div>
              <h3 className="text-2xl font-serif font-bold text-gray-800 mb-4">About Alva's Pragati</h3>
              <p className="text-gray-600 mb-4">
                Alva’s Pragati is a flagship mega placement drive organized by Alva’s Education Foundation as part of its Corporate Social Responsibility (CSR) initiative. Since its inception in 2007, Pragati has emerged as a powerful platform connecting job seekers—especially from rural and underprivileged backgrounds—with leading recruiters from across the country.

                Spanning sectors like IT, Manufacturing, Healthcare, Sales & Retail, Banking, Education, Media, Hospitality, and NGOs, Pragati caters to a diverse talent pool including Graduates, Postgraduates, Engineers, Para-medical professionals, ITI/Diploma holders, and skilled manpower from PUC & SSLC backgrounds.

                Completely free of cost for both job aspirants and employers, the event has so far facilitated 36,151 spot job offers, shortlisting over 61,517 candidates.

                It is a matter of great pride that Alva’s Pragati is now considered one of the largest placement drives in the country, making a remarkable impact in the employment landscape.

                Now in its 15th edition, Alva’s Pragati will be held on August 1 & 2, 2025, at the Alva’s Vidyagiri Campus, Moodubidire, continuing its mission to create meaningful career opportunities and transform lives
              </p>
              <button
                onClick={() => window.open('https://www.alvaspragati.com/', '_blank')}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Learn More About Us
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default HeroPage;