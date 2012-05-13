{-# LANGUAGE OverloadedStrings #-}
import Web.Scotty
import qualified Web.Scotty as S
import Control.Monad
import qualified Data.Text.Lazy as TL
import Data.Monoid
import Network.Wai.Middleware.Static
import qualified Templates.Core as T

import Prelude hiding (div, span)
import Text.Blaze.Html5 hiding (nav)
import Text.Blaze.Html5.Attributes hiding (wrap, span)
import qualified Text.Blaze.Html5 as H
import qualified Text.Blaze.Html5.Attributes as A
import Text.Blaze.Extra
import Text.Blaze.Renderer.String

a <> b = a `mappend` b

blaze = S.html . TL.pack . renderHtml

main = scotty 3000 $ do
  middleware . staticRoot $ "public/"

  get "/" $ do
    blaze $ T.wrap $ h1 "hello world!"
  
{-
  get "/" $ do
    blaze $ docTypeHtml $ do
      H.html $ do
        H.head $ do
          js "js/crafty.js"
        H.body mempty
-}
