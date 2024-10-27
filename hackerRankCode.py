

import math
import os
import random
import re
import sys




#
# Complete the 'summarize' function below.
#
# The function is expected to return a STRING.
# The function accepts STRING inputJSON as parameter.
#
import json


def int_to_dollar(amount):
    return f"${abs(amount)}" if amount >= 0 else f"-${abs(amount)}"


def summarize(inputJSON):
    query = json.loads(inputJSON)
   
    availCredit =  query["creditLimit"]
    events = query["events"]
   
    balance = 0
    pending = {} #txnID : (amount, time)
    settled = {} #txnID : (amount, initialtime, time)
   
    for event in events:
       
        if event["eventType"] == "TXN_AUTHED":
           
            time = event["eventTime"]
            txnID = event["txnId"]
            amount = event["amount"]
           
            #toDo: add decline payment when credit is insuff..
            availCredit -= amount
            pending[txnID] = (amount, time)
           
        if event["eventType"] == "TXN_SETTLED":
            time = event["eventTime"]
            txnID = event["txnId"]
            amount = event["amount"]
           
           
            if txnID in pending:
                change = amount - pending[txnID][0]
                initialTime = pending[txnID][1]
                availCredit -= change
                balance += amount
                del pending[txnID]
                settled[txnID] = (amount, initialTime, time)
               


        if event["eventType"] == "TXN_AUTH_CLEARED":
            txnID = event["txnId"]
           
            if txnID in pending:
                amount = pending[txnID][0]
                availCredit += amount
                del pending[txnID]
  
       
           
        if event["eventType"] == "PAYMENT_INITIATED":
                       
            time = event["eventTime"]
            txnID = event["txnId"]
            amount = event["amount"]
           
            balance += amount
            pending[txnID] = (amount, time)
       
        if event["eventType"] == "PAYMENT_POSTED":
            time = event["eventTime"]
            txnID = event["txnId"]
           
           
            if txnID in pending:
                amount = pending[txnID][0]
                initialTime = pending[txnID][1]
                availCredit -= amount
               
                del pending[txnID]
                settled[txnID] = (amount, initialTime, time)
               
   
        if event["eventType"] == "PAYMENT_CANCELED":
            txnID = event["txnId"]
           
            if txnID in pending:
                amount = pending[txnID][0]
                balance -= amount
                del pending[txnID]


   
   
    pendingSorted = sorted([(key, value[0], value[1]) for (key,value) in pending.items()], key=lambda tup: -tup[2])
    settledSorted = sorted([(key, value[0], value[1], value[2]) for (key,value) in settled.items()], key=lambda tup: -tup[2])
   
    pendingStr = list(map(lambda tup: str(tup[0])+ ": "+ int_to_dollar(tup[1]) + " @ time " + str(tup[2]) + "\n", pendingSorted))
    settledStr = list(map(lambda tup: str(tup[0])+ ": "+ int_to_dollar(tup[1]) + " @ time " + str(tup[2]) + " (finalized @ time " + str(tup[3]) + ")" + "\n", settledSorted))


    resList = ["Available credit: ", int_to_dollar(availCredit), "\n", "Payable balance: ", int_to_dollar(balance), "\n\n",\
    "Pending transactions:\n"] + pendingStr + ["\n", "Settled transactions:\n"] + settledStr
       
    resStr = "".join(resList).rstrip()
    return resStr
if __name__ == '__main__':
    fptr = open(os.environ['OUTPUT_PATH'], 'w')


    inputJSON = input()


    result = summarize(inputJSON)


    fptr.write(result + '\n')


    fptr.close()


