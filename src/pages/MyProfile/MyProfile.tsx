import React, { useEffect } from 'react';
import twitter_icon from '../../assets/svg/twitter_icon.svg';
import avatar from '../../assets/img/avatar_user.webp';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-multi-carousel/lib/styles.css';
import Popup from 'reactjs-popup';
import Edit from './editprofile';
import Delete from './deleteaccount';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const MyProfile = () => {
  const dropsAccount = useSelector((state: any) => state.account.account);
  const navigate = useNavigate();

  useEffect(() => {
    if (dropsAccount.address === '') navigate('/');
  }, [dropsAccount]);
  return (
    <main className="profile-container min-height-content">
      <div className="my-profile-page">
        <div className="my-profile-header">My Profile</div>

        <div className="my-profile-detail">
          <div className="my-profile-leftdetail">
            <div className="my-profile-detail-header">
              <div className="wrapper-profile">
                <div className="avatar">
                  <img
                    src={
                      dropsAccount.profile_image
                        ? dropsAccount.profile_image
                        : avatar
                    }
                    alt="avatar"
                  />
                </div>
                <div className="my-profile-name">
                  <div className="fullname">{dropsAccount.name}</div>
                  <div className="username">
                    {dropsAccount.instagram
                      ? `@${dropsAccount.instagram}`
                      : '-'}
                  </div>
                </div>
              </div>
              <div className="myProfileSocials">
                <div className="Socialsdetail">
                  <div className="value">15</div>
                  <div className="label">NFTs</div>
                </div>
                {/*<div className="Socialsdetail">*/}
                {/*  <div className="value">300</div>*/}
                {/*  <div className="label">Followers</div>*/}
                {/*</div>*/}
                {/*<div className="Socialsdetail">*/}
                {/*  <div className="value">5</div>*/}
                {/*  <div className="label">Sold</div>*/}
                {/*</div>*/}
              </div>
            </div>
            <div className="bio"></div>
            <div className="my-profile-contact">
              <div className="contact-detail">
                <div className="title">Name</div>
                <div className="content">{dropsAccount.name}</div>
              </div>
              {/*<div className="contact-detail">*/}
              {/*  <div className="title">Birthday</div>*/}
              {/*  <div className="content">07/05/2018</div>*/}
              {/*</div>*/}
              <div className="contact-detail">
                <div className="title">Email</div>
                <div className="content">{dropsAccount.email}</div>
              </div>
              {/*<div className="contact-detail">*/}
              {/*  <div className="title">Mobile Phone</div>*/}
              {/*  <div className="content">0123456789</div>*/}
              {/*</div>*/}
            </div>
          </div>
          <div className="my-profile-rightdetail">
            <div className="my-profile-rightdetail-item">
              <div className="item-label">
                <img src={twitter_icon} alt="" />
                Twitter
              </div>
              <div className="item-value">
                {dropsAccount.twitter ? `twitter/${dropsAccount.twitter}` : '-'}
              </div>
            </div>
            <Popup modal trigger={<button>Edit Profile</button>}>
              {Edit}
            </Popup>
            {/*<Popup*/}
            {/*  modal*/}
            {/*  trigger={*/}
            {/*    <button className="delete-account">Delete Account</button>*/}
            {/*  }*/}
            {/*>*/}
            {/*  {Delete}*/}
            {/*  /!* <>{(close: any) => <Delete close={close} />}</> *!/*/}
            {/*</Popup>*/}
          </div>
        </div>
      </div>
    </main>
  );
};
export default MyProfile;
