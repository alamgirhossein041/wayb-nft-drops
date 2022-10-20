import React from 'react';
import { Link } from 'react-router-dom';
// import icon_twitter from '../../assets/img/icon_twitter.png';
// import icon_discord from '../../assets/img/icon_discord.png';
// import icon_telegram from '../../assets/img/icon_telegram.png';
import icon_insta from '../../assets/icon/instagram.png';
import icon_twitter from '../../assets/icon/twitter.png';
import icon_discord from '../../assets/icon/discord.png';
import wallet_blue from '../../assets/icon/wallet_blue.svg';
import my_collectibles from '../../assets/icon/my_collectibles.svg';
import my_profile from '../../assets/icon/my_profile.svg';
import close_icon from '../../assets/icon/close_icon.svg';
import { useModalWalletsStore, useSidebarStore } from './AppStore';
import useActiveWeb3React from '../../hooks/useActiveWeb3React';
import { useDispatch, useSelector } from 'react-redux';
import { initWallets } from '../../redux/slices/wallet';
import { initDropsAccount } from '../../redux/slices/account';

const UsernameBox = () => {
  const { deactivate } = useActiveWeb3React();
  const { updateOpenWallet } = useModalWalletsStore();
  const { closeSidebar } = useSidebarStore();
  const dispatch = useDispatch();

  const handleClickLogout = async () => {
    await deactivate();
    dispatch(initWallets());
    dispatch(initDropsAccount());
    localStorage.removeItem('dropsJwtToken');
  };

  return (
    <div className="user-dropdown-box">
      <div className="close-sidebar">
        <div className="icon-close" onClick={closeSidebar}>
          <img src={close_icon} alt="Close Icon" />
        </div>
      </div>
      <div className="wrapper-dropdown">
        <div className="wrapper-wallets">
          <div
            className="btn-wallets button"
            onClick={() => {
              updateOpenWallet(true);
              closeSidebar(false);
            }}
          >
            <div className="img-wallet">
              <img src={wallet_blue} alt="wallet" />
            </div>
            <span>Wallets</span>
          </div>
        </div>
        <Link
          to={'/my-collectibles'}
          className="wallet-button"
          onClick={closeSidebar}
        >
          {/* <img src={my_collectibles} alt="My Collectibles" /> */}
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13 5.5C13.0001 5.10204 13.1583 4.72044 13.4398 4.43913C13.7213 4.15783 14.103 3.99987 14.501 4C14.899 4.00013 15.2806 4.15835 15.5619 4.43984C15.8432 4.72133 16.0011 5.10304 16.001 5.501C16.0009 5.89896 15.8427 6.28056 15.5612 6.56187C15.2797 6.84317 14.898 7.00113 14.5 7.001C14.102 7.00087 13.7204 6.84265 13.4391 6.56116C13.1578 6.27967 12.9999 5.89796 13 5.5ZM2 18H16C16 18.5304 15.7893 19.0391 15.4142 19.4142C15.0391 19.7893 14.5304 20 14 20H2C0.9 20 0 19.1 0 18V6C0 5.46957 0.210714 4.96086 0.585786 4.58579C0.960859 4.21071 1.46957 4 2 4V18ZM20 2V14C20 14.5304 19.7893 15.0391 19.4142 15.4142C19.0391 15.7893 18.5304 16 18 16H6C5.46957 16 4.96086 15.7893 4.58579 15.4142C4.21071 15.0391 4 14.5304 4 14V2C4 1.46957 4.21071 0.960859 4.58579 0.585786C4.96086 0.210714 5.46957 0 6 0H18C18.5304 0 19.0391 0.210714 19.4142 0.585786C19.7893 0.960859 20 1.46957 20 2ZM6 2V8.333L9 5L13.855 10.395L14.511 9.664C14.6986 9.45515 14.928 9.28813 15.1844 9.17379C15.4407 9.05945 15.7183 9.00036 15.999 9.00036C16.2797 9.00036 16.5573 9.05945 16.8136 9.17379C17.07 9.28813 17.2994 9.45515 17.487 9.664L18 10.234V2H6Z"
              fill="white"
            />
          </svg>
          My Collectibles
        </Link>
        {/*<Link*/}
        {/*  to={'/purchase-history'}*/}
        {/*  className="wallet-button"*/}
        {/*  onClick={closeSidebar}*/}
        {/*>*/}
        {/*  <img src={purchase_history} alt="Purchase History" />*/}
        {/*  Purchase History*/}
        {/*</Link>*/}
        <Link
          to={'/my-profile'}
          className="wallet-button"
          onClick={closeSidebar}
        >
          {/* <img src={my_profile} alt="My Profile" /> */}
          <svg
            width="20"
            height="17"
            viewBox="0 0 20 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19.0801 11.6669C19.1614 11.2262 19.1614 10.7761 19.0801 10.3355L19.8865 9.86979C19.9802 9.81666 20.0209 9.70727 19.9896 9.60414C19.7802 8.92907 19.4208 8.3165 18.952 7.8102C18.8801 7.73207 18.7645 7.71331 18.6707 7.76644L17.8644 8.23212C17.5237 7.94146 17.1331 7.71644 16.7111 7.56642V6.63508C16.7111 6.52881 16.6361 6.43505 16.533 6.41318C15.836 6.25691 15.1266 6.26316 14.464 6.41318C14.3609 6.43505 14.2859 6.52881 14.2859 6.63508V7.56642C13.864 7.71644 13.4733 7.94146 13.1326 8.23212L12.3263 7.76644C12.2357 7.71331 12.1169 7.73207 12.045 7.8102C11.5762 8.3165 11.2168 8.92907 11.0074 9.60414C10.9762 9.70727 11.0199 9.81666 11.1105 9.86979L11.9169 10.3355C11.8356 10.7761 11.8356 11.2262 11.9169 11.6669L11.1105 12.1325C11.0168 12.1857 10.9762 12.295 11.0074 12.3982C11.2168 13.0733 11.5762 13.6827 12.045 14.1921C12.1169 14.2703 12.2325 14.289 12.3263 14.2359L13.1326 13.7702C13.4733 14.0609 13.864 14.2859 14.2859 14.4359V15.3672C14.2859 15.4735 14.3609 15.5673 14.464 15.5891C15.161 15.7454 15.8704 15.7392 16.533 15.5891C16.6361 15.5673 16.7111 15.4735 16.7111 15.3672V14.4359C17.1331 14.2859 17.5237 14.0609 17.8644 13.7702L18.6707 14.2359C18.7614 14.289 18.8801 14.2703 18.952 14.1921C19.4208 13.6858 19.7802 13.0733 19.9896 12.3982C20.0209 12.295 19.9771 12.1857 19.8865 12.1325L19.0801 11.6669ZM15.5016 12.5169C14.664 12.5169 13.9859 11.8356 13.9859 11.0012C13.9859 10.1667 14.6672 9.48538 15.5016 9.48538C16.3361 9.48538 17.0174 10.1667 17.0174 11.0012C17.0174 11.8356 16.3392 12.5169 15.5016 12.5169ZM7.00074 8.00084C9.21035 8.00084 11.0012 6.21003 11.0012 4.00042C11.0012 1.79081 9.21035 0 7.00074 0C4.79113 0 3.00032 1.79081 3.00032 4.00042C3.00032 6.21003 4.79113 8.00084 7.00074 8.00084ZM13.2889 15.0797C13.217 15.0422 13.1451 14.9985 13.0764 14.9578L12.8295 15.1016C12.642 15.2079 12.4294 15.2672 12.2169 15.2672C11.8763 15.2672 11.5481 15.1235 11.3137 14.8734C10.7418 14.2546 10.3042 13.5014 10.0573 12.6982C9.88542 12.145 10.1167 11.5606 10.6167 11.2699L10.8636 11.1262C10.8605 11.0449 10.8605 10.9637 10.8636 10.8824L10.6167 10.7386C10.1167 10.4511 9.88542 9.86354 10.0573 9.31036C10.0854 9.21972 10.1261 9.12909 10.1573 9.03845C10.0386 9.02908 9.92292 9.00095 9.80103 9.00095H9.2791C8.58528 9.31973 7.81332 9.501 7.00074 9.501C6.18815 9.501 5.41932 9.31973 4.72237 9.00095H4.20044C1.88145 9.00095 0 10.8824 0 13.2014V14.5015C0 15.3297 0.671946 16.0017 1.50016 16.0017H12.5013C12.817 16.0017 13.1108 15.9017 13.3514 15.736C13.3139 15.6173 13.2889 15.4954 13.2889 15.3672V15.0797Z"
              fill="white"
            />
          </svg>
          My Profile
        </Link>
        {/*<div className="help wallet-button">*/}
        {/*  <img src={help} alt="Help Icon" />*/}
        {/*  Help*/}
        {/*</div>*/}
        <div className="wrapper-fanpages">
          <a
            href="https://twitter.com"
            target={'_blank'}
            rel="noreferrer"
            className="custom-icon"
          >
            <img src={icon_twitter} alt="" />
          </a>
          <a
            href={'https://discord.com'}
            target={'_blank'}
            rel="noreferrer"
            className="custom-icon"
          >
            <img src={icon_discord} alt="" />
          </a>
          <a
            href={'https://www.instagram.com'}
            target={'_blank'}
            rel="noreferrer"
            className="custom-icon"
          >
            <img src={icon_insta} alt="" />
          </a>
        </div>
      </div>
      <div className="logout-btn" onClick={handleClickLogout}>
        Log Out
      </div>
    </div>
  );
};

export default UsernameBox;
