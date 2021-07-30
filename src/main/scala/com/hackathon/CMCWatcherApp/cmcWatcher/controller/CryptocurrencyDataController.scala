package com.hackathon.CMCWatcherApp.cmcWatcher.controller

import com.hackathon.CMCWatcherApp.cmcWatcher.access.CoinMarketCapAccess
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.{HttpStatus, ResponseEntity}
import org.springframework.stereotype.Component
import org.springframework.web.bind.annotation.{GetMapping, PathVariable, RestController}

@Component
@RestController("/cryptocurrency")
class CryptocurrencyDataController(@Autowired accessClient: CoinMarketCapAccess) {


  @GetMapping("/getPrice/{cryptoName}")
  def getCryptoCurrencyPrice(@PathVariable cryptoName: String): ResponseEntity[String] = {
    accessClient.getCryptoPrice(cryptoName) match {
      case Right(name) => ResponseEntity.status(HttpStatus.OK).body(name)
      case Left(message) => ResponseEntity.status(HttpStatus.NOT_FOUND).body(message)
    }
  }
}
