import { RouteComponentProps } from "@reach/router"
import { navigate } from "gatsby"
import {
  useAdminDeleteProduct,
  useAdminGiftCards,
  useAdminProducts,
  useAdminStore,
  useAdminUpdateProduct,
} from "medusa-react"
import React, { useMemo, useState, useRef } from "react"
import PageDescription from "../../components/atoms/page-description"
import Spinner from "../../components/atoms/spinner"
import PlusIcon from "../../components/fundamentals/icons/plus-icon"
import BannerCard from "../../components/molecules/banner-card"
import BodyCard from "../../components/organisms/body-card"
import DeletePrompt from "../../components/organisms/delete-prompt"
import GiftCardBanner from "../../components/organisms/gift-card-banner"
import GiftCardTable from "../../components/templates/gift-card-table"
import useNotification from "../../hooks/use-notification"
import { ProductStatus } from "../../types/shared"
import { getErrorMessage } from "../../utils/error-messages"
import CustomGiftcard from "./custom-giftcard"
import NewGiftCard from "./new"
import TinderCard from "react-tinder-card"

const FilterProductsSwipper: React.FC<RouteComponentProps> = () => {
  const { products, isLoading } = useAdminProducts({
    is_giftcard: false,
  })
  const filtered = products?.filter((product) => {
    return (
      product.tags?.filter((tag) => tag.value.includes("featured_")).length > 0
    )
  })
  const { store } = useAdminStore()

  const [lastDirection, setLastDirection] = useState()

  const swiped = (direction, nameToDelete) => {
    console.log("removing: " + nameToDelete)
    setLastDirection(direction)
  }

  const outOfFrame = (name) => {
    console.log(name + " left the screen!")
  }
  return (
    <>
      <div className="flex flex-col grow h-full pb-xlarge">
        {/* <PageDescription
          title="Gift Cards"
          subtitle="Manage the Gift Cards of your peeps marketplace"
        /> */}
        {/* {!isLoading ? (
          <>
            <div className="mb-base">
              {giftCardWithCurrency ? (
                <GiftCardBanner
                  {...giftCardWithCurrency}
                  onDelete={() => setShowDelete(true)}
                  onEdit={() => navigate("/a/gift-cards/manage")}
                  onUnpublish={onUpdate}
                />
              ) : (
                <BannerCard title="Are you ready to sell your first Gift Card?">
                  <BannerCard.Description
                    cta={{
                      label: "Create Gift Card",
                      onClick: () => setShowCreate(true),
                    }}
                  >
                    No Gift Card has been added yet.
                  </BannerCard.Description>
                </BannerCard>
              )}
            </div>
            <div className="w-full flex flex-col grow">
              <BodyCard
                title="History"
                subtitle="See the history of purchased Gift Cards"
                actionables={actionables}
              >
                <GiftCardTable />
              </BodyCard>
            </div>
          </>
        ) : (
          <div className="w-full flex items-center justify-center h-44 rounded-rounded border border-grey-20">
            <Spinner variant="secondary" size="large" />
          </div>
        )} */}

        {filtered &&
          filtered.map((product, index) => (
            <TinderCard
              className="swipe"
              key={product.title}
              onSwipe={(dir) => swiped(dir, product.title)}
              onCardLeftScreen={() => outOfFrame(product.title)}
            >
              <div
                style={{
                  backgroundImage: "url(" + product.thumbnail + ")",
                  height: "50vh",
                  width: "100%",
                  maxWidth: "500px",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  position: "absolute",
                }}
                className="card"
              >
                <h3>{product.title}</h3>
              </div>
            </TinderCard>
          ))}

        {/* <div
          style={{
            top: "63vh",
            position: "absolute",
          }}
          className="buttons"
        >
          <button
            style={{ backgroundColor: !canSwipe && "#c3c4d3" }}
            onClick={() => swipe("left")}
          >
            Swipe left!
          </button>
          <button
            style={{ backgroundColor: !canGoBack && "#c3c4d3" }}
            onClick={() => goBack()}
          >
            Undo swipe!
          </button>
          <button
            style={{ backgroundColor: !canSwipe && "#c3c4d3" }}
            onClick={() => swipe("right")}
          >
            Swipe right!
          </button>
        </div> */}
        {/* </div> */}
        {/* <TinderCard
          onSwipe={onSwipe}
          onCardLeftScreen={() => onCardLeftScreen("fooBar")}
          preventSwipe={["right", "left"]}
        >
          Hello, World!
        </TinderCard> */}
      </div>
      {/* {showCreateCustom && (
        <CustomGiftcard onDismiss={() => setShowCreateCustom(false)} />
      )} */}
      {/* {showCreate && <NewGiftCard onClose={() => setShowCreate(!showCreate)} />}
      {showDelete && (
        <DeletePrompt
          handleClose={() => setShowDelete(!showDelete)}
          onDelete={async () => onDelete()}
          successText="Successfully deleted Gift Card"
          confirmText="Yes, delete"
          heading="Delete Gift Card"
        />
      )} */}
    </>
  )
}

export default FilterProductsSwipper
