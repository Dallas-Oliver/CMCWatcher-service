package com.hackathon.CMCWatcherApp.cmcWatcher

import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.context.annotation.ComponentScan


@SpringBootApplication
@ComponentScan
class Application

object Application extends App {
  SpringApplication.run(classOf[Application]);
}
