Notes on Testing standards

1) when testing refs to instant is is typical to use 
    new Instant(new Instant())
This is to test that the code is correctly using the date property rather than value
therefore testing for either simple Instants or comple Instant setups

2) tests scripts are broken down to the method level in order to make them manageable

3) all thrown exceptions should check the message of the exception in case
