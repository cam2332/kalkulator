/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import Orientation from 'react-native-orientation'

import { evaluate } from 'mathjs'

function Factorial(num) {
  if(num < 15) {
    let rval = 1;
    for(let i=2; i <= num; i++) {
      rval *= i;
    }
    return rval;
  } else {
    return ''
  }
}

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 
      resultText: ' ',
      calculationText: '',
      OrientationStatus: '',
      Height_Layout: '',
      Width_Layout: '',
      }
  }

  componentDidMount() {
    Orientation.addOrientationListener(this._orientationDidChange);
  }

  detectOrientation() {
    if(this.state.Width_Layout > this.state.Height_Layout) {
      this.setState({
        OrientationStatus: 'LANDSCAPE'
      })
    } else {
      this.setState({
        OrientationStatus: 'PORTRAIT'
      })
    }
  }

  componentWillUnmount() {
    Orientation.getOrientation((err, orientation) => {
      console.log(`Current Device Orientation: ${orientation}`);    
      ToastAndroid.show(`Current Device Orientation: ${orientation}`, ToastAndroid.SHORT);    
    });
    Orientation.removeOrientationListener(this._orientationDidChange);
  }

  _orientationDidChange = (orientation) => {   
    console.log(`Device Orientation changed to: ${orientation}`);    
    ToastAndroid.show(`Device Orientation changed to: ${orientation}`, ToastAndroid.SHORT); 
    if ( orientation === 'LANDSCAPE') {

    } else {

    }
  }
  
  handleTap(value) {    
    switch(value) {
      case '0':
        if(this.state.calculationText !== '0') {
          this.setState({
            calculationText: this.state.calculationText+value,
          })
          ToastAndroid.show(evaluate(this.state.calculationText+value).toString(), ToastAndroid.SHORT)
          this.setState({
            resultText: this.state.calculationText+value !== evaluate(this.state.calculationText+value).toString() ? evaluate(this.state.calculationText+value).toString() : ''
          })
        }
        
        break;
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
        if(this.state.calculationText !== '0') {
          this.setState({
            calculationText: this.state.calculationText+value,
          })
          ToastAndroid.show(evaluate(this.state.calculationText+value).toString(), ToastAndroid.SHORT)
          this.setState({
            resultText: this.state.calculationText+value !== evaluate(this.state.calculationText+value).toString() ? evaluate(this.state.calculationText+value).toString() : ''
          })
        } else {
          this.setState({
            calculationText: value,
          })
        }
        break;
      case 'AC':
        this.setState({
          calculationText: '',
          resultText: ' '
        })
        break;
      case '+':
      case '-':
      case '*':
      case '/':
        this.setState({
          calculationText: this.state.calculationText+value
        })
        break;
      case '.':
      if(!(this.state.calculationText.includes('.'))) {
        this.setState({
          calculationText: this.state.calculationText+value
        })
      }        
        break;
      case '=':
        if(this.state.resultText !== '') {
          this.setState({
            calculationText: this.state.resultText,
            resultText: ''
          })
        }
        break;
      case '%':
        if(!isNaN(this.state.calculationText) && this.state.resultText === '') {
          this.setState({
            calculationText: this.state.calculationText / 100
          })
        } else {
          this.setState({
          calculationText: this.state.calculationText+value,
          resultText: this.state.resultText / 100
        })
        }              
        break;
      case 'π':
        if(this.state.calculationText === '') {
          this.setState({
            calculationText: Math.PI
          })
        }
        break;
      case 'e':
        if(this.state.calculationText === '') {
          this.setState({
            calculationText: Math.E
          })
        } else if (!isNaN(this.state.calculationText)) {
          this.setState({
            calculationText: this.state.calculationText * Math.E
          })
        } else if (!isNaN(this.state.resultText)) {
          this.setState({
            calculationText: this.state.resultText * Math.E,
            resultText: ''
          })
        }
        break;
      case 'x^3':
        if(!isNaN(this.state.calculationText)) {
          this.setState({
            calculationText: Math.pow(this.state.calculationText, 3)
          })
        } else if(!isNaN(this.state.resultText)) {
          this.setState({
            calculationText: Math.pow(this.state.resultText, 3)
          })
        }
        break;
      case 'x^2':
        if(!isNaN(this.state.calculationText)) {
          this.setState({
            calculationText: Math.pow(this.state.calculationText, 2)
          })
        } else if(!isNaN(this.state.resultText)) {
          this.setState({
            calculationText: Math.pow(this.state.resultText, 2)
          })
        }
        break;
      case '+/-':
       if(this.state.calculationText !== '' && !isNaN(this.state.calculationText) && this.state.resultText === '') {
         this.setState({
           calculationText: this.state.calculationText * -1
         })
       } else if (this.state.resultText !== '' && !isNaN(this.state.resultText)) {
         this.setState({
           calculationText: this.state.resultText * -1,
           resultText: ''
         })
       }
       break;
      case '10^x':
        if(!isNaN(this.state.calculationText) && this.state.resultText === '') {
         this.setState({
           calculationText: Math.pow(10,this.state.calculationText)
         })
       } else if (!isNaN(this.state.resultText)) {
         this.setState({
           calculationText: Math.pow(10,this.state.resultText),
           resultText: ''
         })
       }
       break;
      case 'e^x':
        if(!isNaN(this.state.calculationText) && this.state.resultText === '') {
         this.setState({
           calculationText: Math.pow(Math.E,this.state.calculationText)
         })
        } else if (!isNaN(this.state.resultText)) {
          this.setState({
           calculationText: Math.pow(Math.E,this.state.resultText),
           resultText: ''
          })
        }
        break;
      case 'x!':
        if(!isNaN(this.state.calculationText) && this.state.resultText === '') {
          this.setState({
            calculationText: Factorial(this.state.calculationText)
          })       
       } else if (!isNaN(this.state.resultText)) {
          this.setState({
            calculationText: Factorial(this.state.resultText),
            resultText: ''
          })
       }
       break;
      case 'log10':
        if(!isNaN(this.state.calculationText) && this.state.resultText === '') {
         this.setState({
           calculationText: Math.log10(this.state.calculationText)
         })
        } else if (!isNaN(this.state.resultText)) {
          this.setState({
           calculationText: Math.log10(this.state.resultText),
           resultText: ''
          })
        }
        break;
      case 'ln':
        if(!isNaN(this.state.calculationText) && this.state.resultText === '') {
         this.setState({
           calculationText: Math.log(this.state.calculationText)
         })
        } else if (!isNaN(this.state.resultText)) {
          this.setState({
           calculationText: Math.log(this.state.resultText),
           resultText: ''
          })
        }
        break;
    }
  }

  render() {
    let key = 0;
    let rows = [];
    let numsPort = [['0','','.','='],['1','2','3','+'],['4','5','6','-'],['7','8','9','*'],['AC','','','/']];
    let numsLand = [['π', 'x^3','0','','.','='],['e','x^2','1','2','3','+'],['ln','log10','4','5','6','-'],['e^x','10^x','7','8','9','*'],['y√x','x!','AC','+/-','%','/']]
    if(this.state.OrientationStatus === 'PORTRAIT') {
      for(let i=0; i<5;i++) {
        let row =[];
        for(let j=0; j<4;j++) {
          key += 1;
          row.push(<TouchableOpacity key={key} style={j === 3 ? i === 0 ? styles.buttonColor : styles.buttonNormal2 : styles.buttonNormal} onPress={() => this.handleTap(numsPort[i][j])}>
            <Text style={styles.text}>{numsPort[i][j]}</Text>
          </TouchableOpacity>);
        }
        rows.push(<View key={key+100} style={{
          justifyContent: 'space-between',
          flexDirection: 'row',            
        }}>
          {row}
        </View>)
      }
    } else {
      for(let i=0; i<5;i++) {
        let row =[];
        for(let j=0; j<6;j++) {
          key += 1;
          row.push(<TouchableOpacity key={key} style={j === 5 ? i === 0 ? styles.buttonColorLand : styles.buttonNormal2Land : styles.buttonNormalLand} onPress={() => this.handleTap(numsLand[i][j])}>
            <Text style={styles.textLand}>{numsLand[i][j]}</Text>
          </TouchableOpacity>);
        }
        rows.push(<View key={key+100} style={{
          justifyContent: 'space-between',
          flexDirection: 'row',            
        }}>
          {row}
        </View>)
      }
    }

    return (
      <>
        <StatusBar backgroundColor='#000000' barStyle="light-content" />
        <View style={{
          flex: 1,
          backgroundColor: '#000000',
          flexDirection: 'column-reverse'
        }} onLayout={(event) => this.setState({
          Width_Layout: event.nativeEvent.layout.width,
          Height_Layout: event.nativeEvent.layout.height
        }, () => this.detectOrientation())}>
          {rows}
          
          {true ?
            <View style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              padding: this.state.OrientationStatus === 'PORTRAIT' ? 25 : 0,
            }}>
              <Text style={styles.text3}>{this.state.resultText}</Text>
            </View>
            :
            null
          }
          <View style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            padding: this.state.OrientationStatus === 'PORTRAIT' ? 25 : 0,
          }}>
            <Text style={styles.text2}>{this.state.calculationText}</Text>
          </View>
        </View>        
      </>
    )
  }
}



const styles = StyleSheet.create({
  text: {
    fontSize: 45,
    color: '#ffffff'
  },
  text2: {
    fontSize: 60,
    color: '#ffffff'
  },
  text3: {
    fontSize: 45,
    color: '#c9c9c9'
  },
  button2Horizon: {
    flex: 2,
    padding: 25,
  },
  buttonNormal: {
    flex: 1,
    padding: 25,
    alignItems: 'center'
  },
  buttonNormal2: {
    flex: 1,
    padding: 25,
    backgroundColor: '#222',
    alignItems: 'center'
  },
  buttonColor: {
    flex: 1,
    padding: 25,
    backgroundColor: '#bb1e10',
    alignItems: 'center'
  },

  textLand: {
    fontSize: 35,
    color: '#ffffff'
  },
  text2Land: {
    fontSize: 50,
    color: '#ffffff'
  },
  text3Land: {
    fontSize: 35,
    color: '#c9c9c9'
  },
  button2HorizonLand: {
    flex: 2,
    padding: 10,
  },
  buttonNormalLand: {
    flex: 1,
    padding: 10,
    alignItems: 'center'
  },
  buttonNormal2Land: {
    flex: 1,
    padding: 10,
    backgroundColor: '#222',
    alignItems: 'center'
  },
  buttonColorLand: {
    flex: 1,
    padding: 10,
    backgroundColor: '#bb1e10',
    alignItems: 'center'
  },
});