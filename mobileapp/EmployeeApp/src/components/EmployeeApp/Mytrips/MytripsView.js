import React from 'react';
import axios                                                    from 'axios';
import styles                                                   from './style.js';
import HeaderBar                                                from '../../../layouts/Header/Header.js';
import BookingsTabView                                          from './MytripsTabView'

export default class BookingView extends React.Component{
constructor(props) {
  super(props);

  }


  render(){
      const { navigation } = this.props;
      return(
        <React.Fragment>
          <HeaderBar navigation={navigation} showBackBtn={true} headerName={"My Trips"}/> 
            <BookingsTabView navigation={navigation}/> 
        </React.Fragment> 
      );
  }

}
