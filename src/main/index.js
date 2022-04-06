'use strict'

import { app, BrowserWindow } from 'electron'
import * as path from 'path'
import { format as formatUrl } from 'url'

const isDevelopment = process.env.NODE_ENV !== 'production'

let mainWindow

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    mainWindow = createMainWindow()
  }
})

app.on('ready', () => {
  mainWindow = createMainWindow()
  scrapeTeamsStatusBySelenium()
})

function createMainWindow() {
  const window = new BrowserWindow()

  if (isDevelopment) {
    window.webContents.openDevTools()
  }

  if (isDevelopment) {
    window.loadURL(`http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`)
  }
  else {
    window.loadURL(formatUrl({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file',
      slashes: true
    }))
  }

  window.on('closed', () => {
    mainWindow = null
  })

  return window
}

/* eslint-disable */

async function scrapeTeamsStatusBySelenium() {
  const { Builder, By, until } = require('selenium-webdriver')
  const driver = await new Builder().forBrowser('firefox').build()
  try {
    await driver.get('https://teams.microsoft.com/_?lm=deeplink&lmsrc=NeutralHomePageWeb&cmpid=WebSignIn&culture=ja-jp&country=jp#/conversations/?ctx=chat')
    await driver.wait(until.titleIs('チャット | Microsoft Teams'), 120000)
    const span = await driver.findElement(By.css('.cle-item span.ts-skype-status'))
    const status = await span.getAttribute('title')
    console.log(status)
  } finally {
    await driver.quit();
  }
}
