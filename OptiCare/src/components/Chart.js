import { StyleSheet, Text, View, Dimensions} from 'react-native'
import React, { useEffect, useState } from 'react'
import { LineChart, BarChart,} from "react-native-chart-kit";
import { FIREBASE_AUTH, FIREBASE_DB } from '../../FirebaseConfig';
import { collection, getDocs } from 'firebase/firestore';


const screenWidth = Dimensions.get('window').width;




  

const Chart = () => {
  const [numberOfEvents, setNumberOfEvents] = useState(0);
  const [events, setEvents] = useState([]); 
  const [monthlyEventCounts, setMonthlyEventCounts] = useState({});


  const fetchEvents = async () => {
    const querySnapshot = await getDocs(collection(FIREBASE_DB, 'events'));
    const eventsData = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    setEvents(eventsData); 
  };


  const calculateMonthlyEventCounts = () => {
    const counts = {}; 

    events.forEach(event => {
      const eventDate = event.date; 
      const [year, month] = eventDate.split("-"); 

      // Create a key for the month (e.g., "2023-10")
      const monthKey = `${year}-${month}`;

     
      if (!counts[monthKey]) {
        counts[monthKey] = 0;
      }
      counts[monthKey]++;
    });

    setMonthlyEventCounts(counts); 
  };

  const getEventCountsForCurrentYear = () => {
    const currentYear = new Date().getFullYear(); // Get the current year
    const monthlyCounts = Array(12).fill(0); // Initialize an array for 12 months with 0 events

    Object.keys(monthlyEventCounts).forEach(monthKey => {
      const [year, month] = monthKey.split("-");
      if (parseInt(year) === currentYear) {
        monthlyCounts[parseInt(month) - 1] = monthlyEventCounts[monthKey]; 
      }
    });

    return monthlyCounts; 
  };

  useEffect(() => {
    fetchEvents();
    if (events.length > 0) {
      calculateMonthlyEventCounts(); 
    }
  }, [events]);

 


  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        data:  getEventCountsForCurrentYear(),
      },
    ],
  };

  const chartConfig = {
    backgroundColor: '#FFFFFF',
    decimalPlaces: 0, 
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  };


  return (
    <View style={styles.container}>
      <Text>Schedule Volume</Text>
      
      <BarChart
        data={data}
        width={screenWidth}
        height={300}
        chartConfig={chartConfig}
      />
    </View>
    
  )
}
export default Chart

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
})