/* eslint-disable prettier/prettier */
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {STYLES} from '../../constants/theme';
import ButtonActif from '../../components/ButtonActif';
import {Text} from 'react-native-paper';
import {BarChart, LineChart, PieChart} from 'react-native-gifted-charts';

const Graph = () => {
  const navigation = useNavigation();

  const data = [
    {
      value: 2500,
      frontColor: '#006DFF',
      gradientColor: '#009FFF',
      spacing: 6,
      label: 'Jan',
    },
    {value: 2400, frontColor: '#3BE9DE', gradientColor: '#93FCF8'},

    {
      value: 3500,
      frontColor: '#006DFF',
      gradientColor: '#009FFF',
      spacing: 6,
      label: 'Feb',
    },
    {value: 3000, frontColor: '#3BE9DE', gradientColor: '#93FCF8'},

    {
      value: 4500,
      frontColor: '#006DFF',
      gradientColor: '#009FFF',
      spacing: 6,
      label: 'Mar',
    },
    {value: 4000, frontColor: '#3BE9DE', gradientColor: '#93FCF8'},

    {
      value: 5200,
      frontColor: '#006DFF',
      gradientColor: '#009FFF',
      spacing: 6,
      label: 'Apr',
    },
    {value: 4900, frontColor: '#3BE9DE', gradientColor: '#93FCF8'},

    {
      value: 3000,
      frontColor: '#006DFF',
      gradientColor: '#009FFF',
      spacing: 6,
      label: 'May',
    },
    {value: 2800, frontColor: '#3BE9DE', gradientColor: '#93FCF8'},
  ];

  const data1 = [
    {value: 70},
    {value: 36},
    {value: 50},
    {value: 40},
    {value: 18},
    {value: 38},
  ];
  const data2 = [
    {value: 50},
    {value: 10},
    {value: 45},
    {value: 30},
    {value: 45},
    {value: 18},
  ];

  const data3 = [{value: 15}, {value: 30}, {value: 26}, {value: 40}];

  const pieData = [
    {value: 54, color: '#177AD5'},
    {value: 40, color: '#79D2DE'},
    {value: 20, color: '#ED6665'},
  ];

  return (
    <>
      <View style={[myStyle, STYLES.mainLayout]}>
        <ScrollView>
          {/* barchart */}
          <View
            style={{
              padding: 16,
              borderRadius: 20,
              backgroundColor: '#232B5D',
            }}>
            <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>
              Overview
            </Text>
            <View style={{alignItems: 'center'}}>
              <BarChart
                data={data}
                barWidth={16}
                initialSpacing={10}
                spacing={14}
                barBorderRadius={4}
                showGradient
                yAxisThickness={0}
                xAxisType={'dashed'}
                xAxisColor={'lightgray'}
                yAxisTextStyle={{color: 'lightgray'}}
                stepValue={1000}
                maxValue={6000}
                noOfSections={6}
                yAxisLabelTexts={['0', '1k', '2k', '3k', '4k', '5k', '6k']}
                labelWidth={40}
                xAxisLabelTextStyle={{color: 'lightgray', textAlign: 'center'}}
                showLine
                lineConfig={{
                  color: '#F29C6E',
                  thickness: 3,
                  curved: true,
                  hideDataPoints: true,
                  shiftY: 20,
                  initialSpacing: -30,
                }}
              />
            </View>
          </View>
          {/* barchart */}
          {/* Areachart */}
          <View
            style={{
              paddingVertical: 50,
              backgroundColor: '#1C1C1C',
              borderRadius: 20,
              top: 10,
            }}>
            <LineChart
              areaChart
              curved
              data={data1}
              data2={data2}
              hideDataPoints
              spacing={56}
              color1="#8a56ce"
              color2="#56acce"
              startFillColor1="#8a56ce"
              startFillColor2="#56acce"
              endFillColor1="#8a56ce"
              endFillColor2="#56acce"
              startOpacity={0.9}
              endOpacity={0.2}
              initialSpacing={0}
              noOfSections={4}
              yAxisColor="white"
              yAxisThickness={0}
              rulesType="solid"
              rulesColor="gray"
              yAxisTextStyle={{color: 'gray'}}
              yAxisLabelSuffix="%"
              xAxisColor="lightgray"
              pointerConfig={{
                pointerStripUptoDataPoint: true,
                pointerStripColor: 'lightgray',
                pointerStripWidth: 2,
                strokeDashArray: [2, 5],
                pointerColor: 'lightgray',
                radius: 4,
                pointerLabelWidth: 100,
                pointerLabelHeight: 120,
                pointerLabelComponent: items => {
                  return (
                    <View
                      style={{
                        height: 120,
                        width: 100,
                        backgroundColor: '#282C3E',
                        borderRadius: 4,
                        justifyContent: 'center',
                        paddingLeft: 16,
                      }}>
                      <Text style={{color: 'lightgray', fontSize: 12}}>
                        {2018}
                      </Text>
                      <Text style={{color: 'white', fontWeight: 'bold'}}>
                        {items[0].value}
                      </Text>
                      <Text
                        style={{
                          color: 'lightgray',
                          fontSize: 12,
                          marginTop: 12,
                        }}>
                        {2019}
                      </Text>
                      <Text style={{color: 'white', fontWeight: 'bold'}}>
                        {items[1].value}
                      </Text>
                    </View>
                  );
                },
              }}
            />
          </View>
          {/* area chart end */}

          {/* Araechart1 */}
              <View
              style={{
                top: 30,
              }}
              >
              <LineChart
        areaChart
        data={data3}
        startFillColor="rgb(46, 217, 255)"
        startOpacity={0.8}
        endFillColor="rgb(203, 241, 250)"
        endOpacity={0.3}
        />
              </View>
          {/* Area chart1 */}

          {/* Graph 2 */}
          <PieChart
          data={pieData}
          showText
          textColor="black"
          radius={150}
          textSize={20}
          focusOnPress
          showValuesAsLabels
          showTextBackground
          textBackgroundRadius={26}
        />
          {/* Graphv2 end */}
        </ScrollView>
      </View>
    </>
  );
};

const myStyle = StyleSheet.create({
  gap: 40,
  justifyContent: 'center',
});

export default Graph;
