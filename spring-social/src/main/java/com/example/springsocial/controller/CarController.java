package com.example.springsocial.controller;

import com.example.springsocial.exception.ResourceNotFoundException;
import com.example.springsocial.model.Car;
import com.example.springsocial.model.User;
import com.example.springsocial.repository.UserRepository;
import com.example.springsocial.security.CurrentUser;
import com.example.springsocial.security.UserPrincipal;
import com.example.springsocial.service.CarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Transactional
@RestController
@RequestMapping("/car/")
public class CarController {
    @Autowired
    private CarService carService;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("save-car")
    public Car saveCar(@AuthenticationPrincipal UserPrincipal userPrincipal, @RequestBody Car car) {
        return carService.saveCar(userPrincipal, car);

    }


    @GetMapping("cars")
    public List<Car> showAllCars() {
        return carService.showAllCars();
    }

    @GetMapping("search")
    public List<Car> searchCars(@RequestParam("by") String by,
                                @RequestParam(value = "keyword", required = false) String keyword,
                                @RequestParam(value = "min", required = false) Long min,
                                @RequestParam(value = "max", required = false) Long max) {
        List<Car> searchedCars = carService.searchCar(by, keyword, min, max);

        System.out.println(searchedCars);
        return searchedCars;
    }

    @GetMapping("viewCar")
    public ResponseEntity<Car> carDetail(@RequestParam Long cid) {
        Optional<Car> carInfo = carService.viewCarDetail(cid);

        if (carInfo.isEmpty()) {
            return null;
        } else {
            return ResponseEntity.ok(carInfo.get());
        }
    }
}
