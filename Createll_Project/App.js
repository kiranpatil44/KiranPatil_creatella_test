
import React from "react";
import {
StyleSheet,
View,
ActivityIndicator,
Text,
Dimensions,
ScrollView,
Picker
} from "react-native";
import { Header } from "react-native-elements";
const formatData = (data, numColumns) => {
  const numberOfFullRows = Math.floor(data.length / numColumns);
  let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
  while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
    data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
    numberOfElementsLastRow++;
  }
  return data;
};
const numColumns = 3;
class App extends React.Component {
constructor(props) {
 super(props);
 this.state = {
   loading: true,
   dataSource:[],
   refreshing: false,
   user: ''
  };
}

 updateSort = (user) => { 
this.setState({ user: user , loading: true})
const url="http://localhost:3000/products?_sort="+user+"&_limit=102"; //change "localhost" to ur pc Ip address
fetch(url)
.then(response => response.json())
.then((responseJson)=> {
var data=[];
for(var i=0;i<responseJson.length;i++){
const date1 = new Date();
const date2 = new Date(responseJson[i].date);
const diffTime = Math.abs(date2 - date1);
const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
var finalDate ;
 switch(diffDays){      
        case 1:      	            
			   finalDate="1 day ago";
        	   break;
        case 2:      
				 finalDate="2 day ago"
      	   break;
        case 3:      	 
             finalDate="3 day ago"			 
        	 break;
		case 4:      
             	 finalDate="4 day ago" 
      	   break;
		case 5:      
             	  finalDate="5 day ago"
      	   break;
		case 6:      
             	 finalDate="6 day ago" 
      	   break;
		case 7:      
            	 finalDate="7 day ago" 
      	   break;
		 default:      
			let date = new Date(responseJson[i].date);
            let dd = date.getDate();
            let mm = date.getMonth() + 1;
            let yyyy = date.getFullYear();
            finalDate=dd + "-" + mm + "-" + yyyy;
      	   break; 
         }
 if (responseJson[i]) {
  data[i]={ id: responseJson[i].id, size: responseJson[i].size, price: responseJson[i].price, face: responseJson[i].face, date :finalDate }
 }
}	
  this.setState({
   loading: false,
   refreshing: false,
   dataSource: data
  })
})
.catch(error=>console.log(error)) //to catch the errors if any
 };
componentDidMount(){
fetch("http://localhost:3000/products?_limit=102")  //change "localhost" to ur pc Ip address 
.then(response => response.json())
.then((responseJson)=> {
 var data=[];
for(var i=0;i<responseJson.length;i++){
const date1 = new Date();
const date2 = new Date(responseJson[i].date);
const diffTime = Math.abs(date2 - date1);
const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
var finalDate ;
 switch(diffDays){
         
        case 1:      	            
			   finalDate="1 day ago";
        	   break;
        case 2:      
				 finalDate="2 day ago"
      	   break;
        case 3:      	 
             finalDate="3 day ago"			 
        	 break;
		case 4:      
             	 finalDate="4 day ago" 
      	   break;
		case 5:      
             	  finalDate="5 day ago"
      	   break;
		case 6:      
             	 finalDate="6 day ago" 
      	   break;
		case 7:      
            	 finalDate="7 day ago" 
      	   break;
		 default:      
			let date = new Date(responseJson[i].date);
            let dd = date.getDate();
            let mm = date.getMonth() + 1;
            let yyyy = date.getFullYear();
            finalDate=dd + "-" + mm + "-" + yyyy;
      	   break;
        	 
         }
		 
 if (responseJson[i]) {
  data[i]={ id: responseJson[i].id, size: responseJson[i].size, price: responseJson[i].price, face: responseJson[i].face, date :finalDate }
 }
}	
  this.setState({
   loading: false,
   refreshing: false,
   dataSource: data
  })
})
.catch(error=>console.log(error)) 
};
 
  render() {
	   if(this.state.loading){
  return( 
    <View style={styles.loader}> 
      <ActivityIndicator size="large" color="#0c9"/>
    </View>
)}else{
    return (
<View style={{ flex: 1}}>
<View style={{ flex: 1/8}}>
<Header
 placement="left"
 leftComponent={ {text: 'SORT BY'}}	  
        centerComponent={ <Picker selectedValue = {this.state.user} onValueChange = {this.updateSort}  style={{ height: 50, width: 150 }}>
               <Picker.Item label = "ID" value = "id" />
               <Picker.Item label = "PRICE" value = "price" />
               <Picker.Item label = "SIZE" value = "size" />
		</Picker>}
   containerStyle={{
    backgroundColor: '#C0C0C0',
  }}
/>
</View>
<ScrollView style={{ flex: 1}}>
	<View style={styles.imgGalleryContainer}>
{formatData(this.state.dataSource, numColumns).map((item, key) => {
 return (
      <View style={styles.item} key={key}>
	   <View style={styles.faces} >
        <Text style={{fontSize:item.size}}>{item.face}</Text>
      </View>
	    <View style={styles.datealign}>  
		<Text style={styles.itemText}>${item.price}</Text>
	    <Text style={styles.itemText}>{item.date}</Text>
      </View>
	  </View>
    );
   })}  
  </View>  
</ScrollView>
</View>  
    );
}
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20,
  },
  item: {
    backgroundColor: '#DCDCDC',
	width: Dimensions.get('window').width /2,
    height: Dimensions.get('window').width / 2,
    borderWidth: 1,
    borderColor: "#808080",
  },
  faces:{
	  alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
    datealign:{
	  alignItems: 'flex-end',
	  flexDirection: "row",
    justifyContent: 'space-between',
    flex: 1,
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },
  itemText: {
    color: '#000',
  },
   loader:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff"
   },
   text:{
	   color:'#FF0000',
	    alignItems: 'center',
    justifyContent: 'center',
   },
   imgGalleryContainer: {
    flex: 1,
    flexDirection: "row",
	flexWrap: "wrap"
  },
});
export default App;