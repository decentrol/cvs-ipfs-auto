import Adafruit_DHT 
import time
import csv
import RPi.GPIO as GPIO
import sys

GPIO.setmode(GPIO.BCM) #setmode to BCM


GPIO.setup(17, GPIO.OUT)# Set relay pins as output
while True: #run it without any stop
    humidity, temperature = Adafruit_DHT.read_retry(Adafruit_DHT.DHT22, 4) # set up temperature and humidity source from gpio pin 4 or pin number 7
    if humidity is not None and temperature is not None:
      print 'Temperature = {0:0.1f}*C  Humidity = {1:0.1f}%'.format(temperature, humidity)
    else:
      print 'can not connect to the sensor!'

    timeC = time.strftime("%I")+':' +time.strftime("%M")+':'+time.strftime("%S") #using the time library define the time. You can find what the percentage stuff means on the python time library docs
    date = time.strftime("%d")+'-' + time.strftime("%m")+'-'+time.strftime("%Y")
    data = [temperature, humidity, timeC, date] #data is an array of temperature, humidity, the time when it's logged and the date.


    with open('loggings/temp_{}.csv'.format(date), "a")as output: #create a csv file in the loggings folder of which the name is temp_today's date.
        writer = csv.writer(output, delimiter=",", lineterminator = '\n') #basic cvs library stuff
        writer.writerow(data) #write data in every row


#the date below is to control my relay board

    if temperature <= 22:
        # Turn all relays OFF
        print('Temp too low, heater turns on')
        GPIO.output(17, GPIO.LOW)

    elif temperature >= 28:
        print('Temp too high, heater turns off')
        GPIO.output(17, GPIO.HIGH)

    else:
        print('Temp is in between 22 and 28, so you good')
        time.sleep(900)# if the temp is not below 22 or above 28, update script every 15 minutes

    time.sleep(1800) #after the heaters are turned off or on, the script is updated after 30 minutes
