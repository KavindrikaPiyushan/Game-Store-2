import React from "react";
import { Routes, Route } from "react-router-dom";
import { Helmet } from "react-helmet-async";
//Pages
import Home from "./pages/Home";
import Login from "./pages/login";
import Profile from "./pages/profile";
import AddGameForm from "./pages/add_new_game";
import Shop from "./pages/Shop";
import GameDetails from "./pages/GameDetails";
import CartPage from "./pages/Cart_Page";
import MyLibrary from "./pages/My_Library";
import ArticleList from "./pages/articles";
import Contact from "./pages/Contact";
import GamingSessions from "./pages/GamingSessions";
import Community from "./pages/community";
import SessionHistory from "./pages/SessionHistory";
import Support from "./pages/Support";
import FAQsPage from "./pages/FAQsPage";
import HandleRentals from "./pages/HandleRentals";
import RentalGamesEmbed from "./pages/RentalGamesEmbed";
import TailoredGames from "./pages/tailoredGames";
import TransactionHistory from "./pages/TransactionHistoryPage";
import DeveloperIncomeTable from "./pages/DeveloperEarningTable";
import ChatHistory from "./pages/ChatHistory";


import DeveloperLoginSignup from "./pages/DeveloperLoginSignup";

import UserMessages from "./pages/UserMessage";

//Games
import Snake from "../Games/Snake";
import PuzzlePlatformGame from "./components/Games/PuzzlePlatformGame";
import ColorGuessingGame from "../Games/ColorGuessingGame";
import Chat from "./pages/chat";

//Gameplay
import GameEmbed from "./pages/GameEmbed";

//Dashboards
import ProductManagerDashboard from "../dashboards/product_manager_dashboard";
import OrderManagerDashboard from "../dashboards/order_manager_dashboard";
import BloggerDashboard from "../dashboards/blogger_dashboard";
import CourierDashBoard from "../dashboards/courier_dashboard";
import Review_manager from "../dashboards/review_dashboard";
import ContactDash from "../dashboards/Customer suport";
import SessionManagerDash from "../dashboards/session_manager_dashbord";
import StaffManager from "../dashboards/staff_manager_dashboard";
import CommunityDashBoard from "../dashboards/communityDashboard";
import UserManagementDashboard from "../dashboards/UserManagementDashboard";
import Payment_Manager from "../dashboards/Payment_manager_dashboard";

import DeveloperDashboard from "../dashboards/usermanage_component/DeveloperDashboard";
import GameDeveloperDashboard from "../dashboards/gamedeveloperdashboard";

import RentedGamesSection from "../dashboards/rentedGamesDash";
import RentalPaymentsDash from "../dashboards/rentalPaymentsDashboard";
import SessionAnalytics from "../dashboards/sessionAnalytics";

import Hangman from "./components/Games/Hangaman";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/adminAddNewGame" element={<AddGameForm />} />
      <Route path="/Shop" element={<Shop />} />
      <Route path="/game/:id" element={<GameDetails />} />
      <Route path="/cartItems" element={<CartPage />} />
      <Route path="/mylibrary" element={<MyLibrary />} />
      <Route path="/articles" element={<ArticleList />} />
      <Route path="/productDashboard" element={<ProductManagerDashboard />} />
      <Route path="/ordersDashboard" element={<OrderManagerDashboard />} />
      <Route path="/bloggerDashboard" element={<BloggerDashboard />} />
      <Route path="/courierDashboard" element={<CourierDashBoard />} />
      <Route path="/CommunityDashBoard" element={<CommunityDashBoard />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/review_dashboard" element={<Review_manager />} />
      <Route path="/ContactDash" element={<ContactDash />} />
      <Route path="/sessionDashboard" element={<SessionManagerDash />} />
      <Route path="/GamingSessions" element={<GamingSessions />} />
      <Route path="/support" element={<Support />} />
      <Route path="/review_dashboard" element={<Review_manager />} />
      <Route path="/playgame/:src/:title" element={<GameEmbed />} />
      <Route path="/faq" element={<FAQsPage />} />
      <Route path="/community" element={<Community />} />
      <Route path="/UserMessage" element={<UserMessages />} />
      <Route path="//chat-history" element={<ChatHistory />} />

      <Route path="/chat" element={<Chat />} />

      <Route
        path="/UserManagementDashboard"
        element={<UserManagementDashboard />}
      />
      <Route path="/SessionHistory" element={<SessionHistory />} />
      <Route path="/HandleRentals/:id" element={<HandleRentals />} />
      <Route path="/Payment_manager_dashboard" element={<Payment_Manager />} />
      <Route
        path="/RentalGamesEmbed/:src/:title/:rentalTime/:rentalId"
        element={<RentalGamesEmbed />}
      />
      <Route path="/TailoredGames" element={<TailoredGames />} />

      <Route path="/DeveloperLoginSignup" element={<DeveloperLoginSignup />} />
      <Route path="/DeveloperDashboard" element={<DeveloperDashboard />} />
      <Route
        path="/GameDeveloperDashboard"
        element={<GameDeveloperDashboard />}
      />

      <Route path="/RentedGamesSection" element={<RentedGamesSection />} />
      <Route path="/Transaction" element={<TransactionHistory />} />
      <Route path="/Snakegame" element={<Snake />} />
      <Route path="/PuzzlePlatformGame" element={<PuzzlePlatformGame />} />

      <Route path="/ColorGuessingGame" element={<ColorGuessingGame />} />

      <Route path="/RentalPayments" element={<RentalPaymentsDash />} />
      <Route path="/SessionAnalytics" element={<SessionAnalytics />} />

      <Route path="DeveloperEarningTable" element={<DeveloperIncomeTable/>} />
      {/*Game Routes*/}
      <Route path="/HangmanGame" element={<Hangman />} />
    </Routes>
  );
};

export default App;
