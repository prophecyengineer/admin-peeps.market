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

const db = [
  {
    name: "Richard Hendricks",
    url: "https://bit.ly/2QpRnmO",
  },
  {
    name: "Erlich Bachman",
    url: "https://bit.ly/2S67yWL",
  },
  {
    name: "Monica Hall",
    url: "https://bit.ly/3vfVFMf",
  },
  {
    name: "Jared Dunn",
    url: "https://bit.ly/3vfVFMf",
  },
  {
    name: "Dinesh Chugtai",
    url: "https://bit.ly/3dQZNMT",
  },
]

const alreadyRemoved: string[] = []
let charactersState = db // This fixes issues with updating characters state forcing it to use the current state and not the state that was active when the card was created.

const FilterProductsSwipper: React.FC<RouteComponentProps> = () => {
  const { products, isLoading } = useAdminProducts({
    is_giftcard: false,
  })
  // // const filtered = products?.filter((product) => {
  // //   return (
  // //     product.tags?.filter((tag) => tag.value.includes("featured_")).length > 0
  // //   )
  // // })
  // const { store } = useAdminStore()

  // const [lastDirection, setLastDirection] = useState()

  // const swiped = (direction, nameToDelete) => {
  //   console.log("removing: " + nameToDelete)
  //   setLastDirection(direction)
  // }

  // const outOfFrame = (name) => {
  //   console.log(name + " left the screen!")
  // }

  // const swipe = (dir) => {
  //   setLastDirection(dir)
  // }

  const [characters, setCharacters] = useState(db)

  const childRefs = useMemo(
    () =>
      Array(db.length)
        .fill(0)
        .map(() => React.createRef()),
    []
  )

  const swiped = (direction: string, nameToDelete: string) => {
    console.log("removing: " + nameToDelete)
    // setLastDirection(direction);
    alreadyRemoved.push(nameToDelete)
  }

  const outOfFrame = (name: string) => {
    console.log(name + " left the screen!")

    charactersState = charactersState.filter(
      (character) => character.name !== name
    )

    setCharacters(charactersState)
  }

  const swipe = (dir: string) => {
    const cardsLeft = characters.filter(
      (person) => !alreadyRemoved.includes(person.name)
    )

    if (cardsLeft.length) {
      // Find the card object to be removed
      const toBeRemoved = cardsLeft[cardsLeft.length - 1].name

      // Find the index of which to make the reference to
      const index = db.map((person) => person.name).indexOf(toBeRemoved)

      // Make sure the next card gets removed next time if this card do not have time to exit the screen
      alreadyRemoved.push(toBeRemoved)

      // Swipe the card!
      childRefs[index].current.swipe(dir)
    }
  }

  console.log("characters", characters)
  console.log("characters", characters)
  return (
    <div className="containerHundred">
      <div className="swiperContainer">
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
        {/*
        {products &&
          products.map((product, index) => (
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
                <h3 className="swipeTitle">{product.title}</h3>
              </div>
            </TinderCard>
          ))} */}
        <div>
          <div className="cardContainer">
            {characters.map((character, index) => (
              <TinderCard
                ref={childRefs[index]}
                className="swipe"
                key={character.name}
                onSwipe={(dir: string) => swiped(dir, character.name)}
                onCardLeftScreen={() => outOfFrame(character.name)}
              >
                <div
                  style={{ backgroundImage: "url(" + character.url + ")" }}
                  className="card"
                >
                  <h3>{character.name}</h3>
                </div>
              </TinderCard>
            ))}
          </div>

          <div className="buttons">
            <button onClick={() => swipe("left")}>Swipe left!</button>
            <button onClick={() => swipe("right")}>add to marketplace</button>
          </div>
        </div>
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
    </div>
  )
}

export default FilterProductsSwipper
