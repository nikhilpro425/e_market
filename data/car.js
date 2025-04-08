class Car {
  brand;
  model;
  speed = 0;
  isTrunkOpen = false;

  constructor(carDetails) {
    this.brand = carDetails.brand;
    this.model = carDetails.model;
  }

  displayInfo() {
    console.log(`${this.brand} ${this.model}, Speed: ${this.speed} km/h`);
  }

  go() {
    if (this.speed < 200 && this.isTrunkOpen != true){
      this.speed += 5;}
  }

  brake() {
    if (this.speed > 0){ 
      this.speed -= 5;}
  }

  openTrunk() {
    this.isTrunkOpen = true;
  }

  closeTrunk() {
    this.isTrunkOpen = false;
  }
}

class RaceCar extends Car{
  acceleration;

  constructor(carDetails) {
    super(carDetails);
    this.acceleration = carDetails.acceleration;
  }

  go() {
    if (this.speed < 200){
      this.speed += this.acceleration;}
  }

  openTrunk() {
    this.isTrunkOpen = false;
  }

  closeTrunk() {
    this.isTrunkOpen = false;
  }
}

const cars = [{
  brand: 'Toyota',
  model: 'Corolla'
},
{
  brand: 'Tesla',
  model: 'Model 3'
},
{
  brand: 'McLaren',
  model: 'F1',
  acceleration: 20
}].map((carDetails) => {
  if (carDetails.acceleration > 5){
    return new RaceCar(carDetails);}
  return new Car(carDetails);
})

console.log(cars);

cars.forEach((car) => {
  car.go();
  car.displayInfo();
  car.openTrunk();
  car.go();
  car.displayInfo();
  car.closeTrunk();
  car.go();
  car.displayInfo();
  car.brake();
  car.displayInfo();
})