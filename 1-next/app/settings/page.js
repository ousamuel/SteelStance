'use client'

import React, {useContext} from 'react'
import {Context} from "../providers"


export default function Settings(){
  const {user} = useContext(Context)
  if (!user){
    return (<p>
      must be logged in
    </p>)
  }

  return(
    <div>
      settings page
    </div>
  )
}