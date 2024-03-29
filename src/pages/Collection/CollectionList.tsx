import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MBoxTypes } from '../../types/MBoxTypes';
import { getMboxListByFeaturedId } from '../../services/services';
import useActiveWeb3React from '../../hooks/useActiveWeb3React';
import CSnackbar from '../../components/common/CSnackbar';
import { getPrice } from '../../utils/getPrice';
import { getNetworkNameByChainId } from '../../utils/getNetworkNameByChainId';

type CollectionListProps = {
  featuredId: string | null;
  companyLogo: string;
  companyName: string;
};

type ExMBoxType = MBoxTypes & {
  remainingAmount: number;
};

const CollectionList: React.FC<CollectionListProps> = ({
  featuredId,
  companyLogo,
  companyName,
}) => {
  const { account, library, activate, chainId } = useActiveWeb3React();
  const [mBoxList, setMBoxList] = useState<ExMBoxType[]>([]);

  const [openSnackbar, setOpenSnackbar] = useState({
    open: false,
    type: '',
    message: '',
  });

  const handleCloseSnackbar = () => {
    setOpenSnackbar({
      open: false,
      type: '',
      message: '',
    });
  };

  useEffect(() => {
    const fetchMBoxList = async () => {
      if (featuredId) {
        const res = await getMboxListByFeaturedId(featuredId);

        if (res.status === 200) {
          // TODO : Show list also when a wallet is not collected.
          // if (res.data.list && library && library.connection) {
          //   const newList = await Promise.all(
          //     res.data.list.map(async (item: MBoxTypes) => {
          //       let remaining = null;
          //       if (library && library.connection)
          //         remaining = await getItemRemains(
          //           item.boxContractAddress,
          //           account,
          //           library
          //         );
          //
          //       return { ...item, remainingAmount: remaining };
          //     })
          //   );
          //   setMBoxList(newList);
          // } else {
          //   console.log('!!! Connect Wallet is needed... !!!');
          //   setOpenSnackbar({
          //     open: true,
          //     type: 'error',
          //     message:
          //       '지갑 연결이 필요합니다! 데이터가 표시되지 않을 수 있습니다.',
          //   });
          // }
          const newList = await Promise.all(
            res.data.list.map(async (item: MBoxTypes) => {
              const remaining = item.totalAmount! - item.soldAmount;
              const milliseconds =
                new Date().getTime() - Date.parse(item.releaseDatetime);

              return {
                ...item,
                remainingAmount: remaining,
                onsale: milliseconds >= 0 ? true : false,
              };
            })
          );
          console.log('=====', newList);
          setMBoxList(newList);
        }
      }
    };

    fetchMBoxList();
  }, [library]);

  return (
    <div className="marketplace min-height-content">
      <div className="marketplace-collection-tittle">Featured Collections</div>
      <div className="marketplace-items">
        {mBoxList.map((item: any, index) => {
          return (
            <Link
              to={
                item.isCollection
                  ? item.itemAmount === 1 && item.mysteryboxItems
                    ? `/collection/${item.id}/${item.mysteryboxItems[0]?.id}`
                    : `/collections/${item.id}`
                  : item.isAirdrop
                  ? `/airdrop/${item.id}/${item.mysteryboxItems[0]?.id}`
                  : `/mbox/${item.id}`
              }
              // state={
              //   item.isCollection && item.itemAmount === 1
              //     ? {
              //         item: {
              //           collectionInfo: item,
              //           ...item.mysteryboxItems[0],
              //           companyLogo,
              //           companyName,
              //           quote: item.quote,
              //         },
              //       }
              //     : item.isAirdrop
              //     ? {
              //         item: {
              //           collectionInfo: item,
              //           ...item.mysteryboxItems[0],
              //           companyLogo,
              //           companyName,
              //           quote: item.quote,
              //         },
              //       }
              //     : { item: { ...item, companyLogo, companyName } }
              // }
              key={index}
            >
              <div className="item_product">
                <div className="item_product_detail MARKETPLACE_TOTAL_KEY fw-600">
                  <div className="total_item">
                    Total Items: {item.totalAmount}
                  </div>
                </div>
                <div className="item_product_detail MARKETPLACE_TYPE_KEY fw-600">
                  <div style={{ textTransform: 'capitalize' }}>
                    {getNetworkNameByChainId(item.chainId)}
                  </div>
                </div>
                <div className="item_product_detail MARKETPLACE_GRAPHICS_KEY">
                  <div className="card-image">
                    {item.packageImage.split('.').pop() === 'mp4' ? (
                      <video
                        playsInline
                        autoPlay
                        controls
                        muted
                        loop
                        controlsList="nodownload"
                        width={'100%'}
                      >
                        <source src={item.packageImage} type="video/mp4" />
                      </video>
                    ) : (
                      <img src={item.packageImage} alt="" draggable={false} />
                    )}
                  </div>
                </div>
                <div className="item_product_detail MARKETPLACE_AUTHOR_KEY">
                  <div className="owner_product">
                    <div className="owner_product_box">
                      <div className="owner_product_avatar">
                        <img src={companyLogo} alt="" />
                      </div>
                      <div className="">{companyName}</div>
                    </div>
                    <div>
                      <Link
                        to={
                          item.isCollection
                            ? item.itemAmount === 1 && item.mysteryboxItems
                              ? `/collection/${item.id}/${item.mysteryboxItems[0]?.id}`
                              : `/collections/${item.id}`
                            : item.isAirdrop
                            ? `/airdrop/${item.id}/${item.mysteryboxItems[0]?.id}`
                            : `/mbox/${item.id}`
                        }
                        // state={
                        //   item.isCollection && item.itemAmount === 1
                        //     ? {
                        //         item: {
                        //           collectionInfo: item,
                        //           ...item.mysteryboxItems[0],
                        //           companyLogo,
                        //           companyName,
                        //           quote: item.quote,
                        //         },
                        //       }
                        //     : item.isAirdrop
                        //     ? {
                        //         item: {
                        //           collectionInfo: item,
                        //           ...item.mysteryboxItems[0],
                        //           companyLogo,
                        //           companyName,
                        //           quote: item.quote,
                        //         },
                        //       }
                        //     : { item: { ...item, companyLogo, companyName } }
                        // }
                      >
                        <div className="status ">
                          {item.onsale
                            ? item.price
                              ? 'Buy Now'
                              : 'Get Now'
                            : 'Waiting'}
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="item_product_detail MARKETPLACE_NAME_KEY">
                  <div className="product_name ">{item.title.en}</div>
                </div>
                <div className="item_product_detail MARKETPLACE_BID_KEY">
                  <div className="box-price">
                    <div className="price ">Price</div>
                    <div className="currency ">
                      {getPrice(item.price, item.quote)}
                    </div>
                  </div>
                </div>
                <div className="item_product_detail MARKETPLACE_NAME_TIME">
                  <div>
                    <div className="remaining ">Remaining</div>
                    <div className="remaining-total ">
                      {!item.isSoldOut && item.remainingAmount
                        ? item.remainingAmount
                        : 'Sold Out'}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      <CSnackbar
        open={openSnackbar.open}
        type={openSnackbar.type}
        message={openSnackbar.message}
        handleClose={handleCloseSnackbar}
      />
    </div>
  );
};

export default CollectionList;
