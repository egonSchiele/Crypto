{-# LANGUAGE OverloadedStrings #-}
module Templates.Core (wrap) where
import Prelude hiding (div, span)
import Text.Blaze.Html5 hiding (nav)
import Text.Blaze.Html5.Attributes hiding (wrap, span)
import qualified Text.Blaze.Html5 as H
import qualified Text.Blaze.Html5.Attributes as A
import Text.Blaze.Extra
import Data.Monoid

wrap :: Html -> Html
wrap content = docTypeHtml $ do
  H.head $ do
    H.title "Game"
    css "css/bootstrap.min.css"
    css "css/style.css"
    js "js/jquery.min.js"
    js "js/crafty-min.js"
    js "js/bootstrap.js"
    js "js/coffee-script.js"
    js "js/test.js"
    script ! src "js/game.coffee" ! type_ "text/coffeescript" $ mempty
  body $ do
    nav
    div !. "content container-fluid" $ do
      content

nav :: Html
nav = div !. "navbar navbar-fixed-top" $
        div !. "navbar-inner" $
          div !. "container" $ do
            a !. "brand" ! href "/" $ "site name"
            ul !. "nav" $ do
              li $ linkTo "/" "Home"
