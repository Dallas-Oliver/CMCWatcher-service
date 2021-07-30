package com.hackathon.CMCWatcherApp.cmcWatcher.access

import org.springframework.stereotype.Component

@Component
class CoinMarketCapAccess {

  def getCryptoPrice(cryptoName: String): Either[String, String] = {
    //make call to cmc for coin price
    //if success, return Right(cryptoName)
    //if fail return Left(error message)

  }
}
