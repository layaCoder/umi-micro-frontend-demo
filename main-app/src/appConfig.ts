const appConfig = (() => { 
  if (process.env.NODE_ENV === 'development') { 
    return {
      mainApp: {
        baseUrl: 'https://www.layablog.top',
      },
    }
  }
  if (process.env.NODE_ENV === 'production') { 
    return {
      mainApp: {
        baseUrl: 'http://production',
      },
    }
  }
})()

export default appConfig