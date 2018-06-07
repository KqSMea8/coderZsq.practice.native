//
//  Function.swift
//  Advanced
//
//  Created by 朱双泉 on 2018/6/7.
//  Copyright © 2018 Castie!. All rights reserved.
//

import Foundation
import CoreLocation
import UIKit

struct Function {
    
    static func run() {
        let funVar = printInt
        funVar(2)
        
        useFunction(function: printInt)
        useFunction(function: funVar)
        
        let myFunc = returnFunc()
        print(myFunc(3))
        
        let f = counterFunc()
        print(f(3))
        print(f(4))
        
        let g = counterFunc()
        print(g(2))
        print(g(2))
        
        print(f(2))
        
        print([1, 2, 3, 4].map(doubler))
        
        let doublerAlt = {(i: Int) -> Int in return i * 2}
        print([1, 2, 3, 4].map(doublerAlt))
        
        print([1, 2, 3].map {$0 * 2})
        
        print([1, 2, 3].map({(i: Int) -> Int in return i * 2}))
        print([1, 2, 3].map({i in return i * 2}))
        print([1, 2, 3].map({i in i * 2}))
        print([1, 2, 3].map({$0 * 2}))
        print([1, 2, 3].map() {$0 * 2})
        print([1, 2, 3].map {$0 * 2})

        print((0..<3).map {_ in arc4random()})
        #if false
        let isEven = {$0 % 2 == 0}
        let isEvenAlt = {(i: Int8) -> Bool in i % 2 == 0}
        let isEvenAlt2: (Int8) -> Bool = {$0 % 2 == 0}
        let isEvenAlt3 = {$0 % 2 == 0} as (Int8) -> Bool
        #endif
        let int8isEven: (Int8) -> Bool = isEven
        
        let myArray = [3, 1, 2]
        print(myArray.sorted())
        print(myArray.sorted(by: >))
        
        var numberStrings = [(2, "two"), (1, "one"), (3, "three")]
        numberStrings.sort(by: <)
        print(numberStrings)
        
        let animals = ["elephant", "zebra", "dog"]
        animals.sorted {lhs, rhs in
            let l = lhs.reversed()
            let r = rhs.reversed()
            return l.lexicographicallyPrecedes(r)
        }
        
        let people = [
            Person2(first: "Emily", last: "Young", yearOfBirth: 2002),
            Person2(first: "David", last: "Gray", yearOfBirth: 1991),
            Person2(first: "Robert", last: "Barnes", yearOfBirth: 1985),
            Person2(first: "Ava", last: "Barnes", yearOfBirth: 2000),
            Person2(first: "Joanne", last: "Miller", yearOfBirth: 1994),
            Person2(first: "Ava", last: "Barnes", yearOfBirth: 1998)
        ]
        
        let lastDescriptor = NSSortDescriptor(key: #keyPath(Person2.last), ascending: true, selector: #selector(NSString.localizedStandardCompare(_:)))
        let firstDescriptor = NSSortDescriptor(key: #keyPath(Person2.first), ascending: true, selector: #selector(NSString.localizedStandardCompare(_:)))
        let yearDescriptor = NSSortDescriptor(key: #keyPath(Person2.yearOfBirth), ascending: true)
        let descriptors = [lastDescriptor, firstDescriptor, yearDescriptor]
        print((people as NSArray).sortedArray(using: descriptors))
        
        var strings = ["Hello", "hallo", "Hallo", "hello"]
        strings.sort {$0.localizedStandardCompare($1) == .orderedAscending}
        print(strings)
        
        print(people.sorted {$0.yearOfBirth < $1.yearOfBirth})
        
        var files = ["one", "file.h", "file.c", "test.h"]
        files.sort {l, r in r.fileExtension.flatMap {
            l.fileExtension?.localizedStandardCompare($0)
        } == .orderedAscending}
        print(files)
        
        print(people.sorted {p0, p1 in
            let left = [p0.last, p0.first]
            let right = [p1.last, p1.first]
            return left.lexicographicallyPrecedes(right) {
                $0.localizedStandardCompare($1) == .orderedAscending
            }
        })
        
        let sortByYear: SortDescriptor<Person2> = {$0.yearOfBirth < $1.yearOfBirth}
        let sortByLastName: SortDescriptor<Person2> = {
            $0.last.localizedStandardCompare($1.last) == .orderedAscending
        }
        
        let sortByYearAlt: SortDescriptor<Person2> = sortDescriptor(key: {$0.yearOfBirth}, by: <)
        print(people.sorted(by: sortByYearAlt))
        
        let sortByYearAlt2: SortDescriptor<Person2> = sortDescriptor(key: {$0.yearOfBirth})
        
        let sortByFirstName: SortDescriptor<Person2> = sortDescriptor(key: {$0.first}, by: String.localizedStandardCompare)
        print(people.sorted(by: sortByFirstName))
        
        let combined: SortDescriptor<Person2> = combine(sortDescriptors: [sortByLastName, sortByFirstName, sortByYear])
        print(people.sorted(by: combined))
        
        let combinedAlt = sortByLastName <||> sortByFirstName <||> sortByYear
        print(people.sorted(by: combinedAlt))
        
        let compare = lift(String.localizedStandardCompare)
        let result = files.sorted(by: sortDescriptor(key: {$0.fileExtension}, by: compare))
        print(result)
        #if false
        let alert = AlertView()
        var logger = TapLogger()
        alert.delegate = logger
        alert.fire()
        print(logger.taps)
        
        if let theLogger = alert.delegate as? TapLogger {
            print(theLogger.taps)
        }
        #endif
        
        let alert = AlertView()
        var logger = TapLogger()
//        Partial application of 'mutating' method is not allowed
//        alert.buttonTapped = logger.logTap
        #if false
        alert.buttonTapped = {logger.logTap(index: $0)}
        #endif
        alert.buttonTapped = {print("Button \($0) was tapped")}
        
        var i = 0
        increment(value: &i)
        
        let y: Int = 0
//        Cannot pass immutable value as inout argument: 'y' is a 'let' constant
//        increment(value: &y)
        
        var array = [0, 1, 2]
        increment(value: &array[0])
        print(array)

        var point = Point(x: 0, y: 0)
        increment(value: &point.x)
        print(point)
        
//        Cannot pass immutable value as inout argument: 'squaredDistance' is a get-only property
//        increment(value: &point.squaredDistance)
        
        point.x++
        print(point)
        
        var dictionary = ["one" : 1]
        dictionary["one"]?++
        print(dictionary["one"])
        
        var x = 0
        incrementTenTimes(value: &x)
        print(x)
        
        let fun: () -> Int
        do {
            var array = [0]
            fun = incref(pointer: &array)
        }
        print(fun())
        
        var robot = ObservableRebot()
        robot.state = .movingForward
        
        var point2 = Point2(x: 3, y: 4)
        print(point2.distanceFromOrigin)
        point2.x += 10
        print(point2.distanceFromOrigin)
        
        let immutablePoint = Point2(x: 3, y: 4)
//        Cannot use mutating getter on immutable value: 'immutablePoint' is a 'let' constant
//        immutablePoint.distanceFromOrigin
        
        let fibs = [0, 1, 1, 2, 3, 5]
        let first = fibs[0]
        print(first)
        print(fibs[1..<3])
        
        print(Array("abcdefghijklmnopqustuvwxyz")[indices: 7, 4, 11, 11, 14])
        
        
        var japan: [String : Any] = [
            "name" : "Japan",
            "capital" : "Tokyo",
            "population" : 126_740_000,
            "coordinates" : [
                "latitude" : 35.0,
                "longitude" : 139.0
            ]
        ]
//        Type 'Any' has no subscript members
//        japan["coordinate"]?["latitude"] = 36.0
        
//        Cannot assign to immutable expression of type 'Double?'
//        (japan["coordinates"] as? [String : Double])?["coordinate"] = 36.0
        
        (japan["coordinates", as: [String : Double].self])?["coordinate"] = 36.0
        print(japan["coordinates"])
    }
}

func printInt(i: Int) {
    print("you passed \(i)")
}

func useFunction(function: (Int) -> ()) {
    function(3)
}

func returnFunc() -> (Int) -> String {
    func innerFunc(i: Int) -> String {
        return "you passed \(i)"
    }
    return innerFunc
}

func counterFunc() -> (Int) -> String {
    var counter = 0
    func innerFunc(i: Int) -> String {
        counter += i
        return "running total: \(counter)"
    }
    return innerFunc
}

func doubler(i: Int) -> Int {
    return i * 2
}

extension BinaryInteger {
    var isEven: Bool {return self % 2 == 0}
}

func isEven<T: BinaryInteger>(_ i: T) -> Bool {
    return i % 2 == 0
}

@objcMembers
final class Person2: NSObject {
    let first: String
    let last: String
    let yearOfBirth: Int
    init(first: String, last: String, yearOfBirth: Int) {
        self.first = first
        self.last = last
        self.yearOfBirth = yearOfBirth
    }
}

extension Person2 {
    override var description: String {
        return "\(first) \(last) (\(yearOfBirth))"
    }
}

typealias SortDescriptor<Value> = (Value, Value) -> Bool

func sortDescriptor<Value, Key>(key: @escaping (Value) -> Key, by areInIncreasingOrder: @escaping (Key, Key) -> Bool) -> SortDescriptor<Value> {
    return {areInIncreasingOrder(key($0), key($1))}
}

func sortDescriptor<Value, Key>(key: @escaping(Value) -> Key) -> SortDescriptor<Value> where Key: Comparable {
    return {key($0) < key($1)}
}

func sortDescriptor<Value, Key>(key: @escaping (Value) -> Key, ascending: Bool = true, by comparator: @escaping (Key) -> (Key) -> ComparisonResult) -> SortDescriptor<Value> {
    return {lhs, rhs in
        let order: ComparisonResult = ascending ? .orderedAscending : .orderedDescending
        return comparator(key(lhs))(key(rhs)) == order
    }
}

func combine<Value>(sortDescriptors: [SortDescriptor<Value>]) -> SortDescriptor<Value> {
    return {lhs, rhs in
        for areInIncreasingOrder in sortDescriptors {
            if areInIncreasingOrder(lhs, rhs) {return true}
            if areInIncreasingOrder(rhs, lhs) {return false}
        }
        return false
    }
}

infix operator <||>: LogicalDisjunctionPrecedence
func <||><A>(lhs: @escaping (A, A) -> Bool, rhs: @escaping (A, A) -> Bool) -> (A, A) -> Bool {
    return {x, y in
        if lhs(x, y) {return true}
        if rhs(y, x) {return false}
        if rhs(x, y) {return true}
        return false
    }
}

func lift<A>(_ compare: @escaping (A) -> (A) -> ComparisonResult) -> (A?) -> (A?) -> ComparisonResult {
    return {lhs in { rhs in
        switch (lhs, rhs) {
        case (nil, nil): return .orderedSame
        case (nil, _): return .orderedAscending
        case (_, nil): return .orderedDescending
        case let (l?, r?): return compare(l)(r)
    }}}
}

extension Array where Element: Comparable {
    private mutating func merge(lo: Int, mi: Int, hi: Int) {
        var tmp: [Element] = []
        var i = lo, j = mi
        while i != mi && j != hi {
            if self[j] < self[i] {
                tmp.append(self[j])
                j += 1
            } else {
                tmp.append(self[i])
                i += 1
            }
        }
        
        tmp.append(contentsOf: self[i..<mi])
        tmp.append(contentsOf: self[j..<hi])
        replaceSubrange(lo..<hi, with: tmp)
    }
    mutating func mergeSortInPlaceInefficient() {
        let n = count
        var size = 1
        while size < n {
            for lo in stride(from: 0, to: n - size, by: size * 2) {
                merge(lo: lo, mi: (lo + size), hi: Swift.min(lo + size * 2, n))
            }
            size *= 2
        }
    }
}

extension Array where Element: Comparable {
    mutating func mergeSortInPlace() {
        var tmp: [Element] = []
        tmp.reserveCapacity(count)
        
        func merge(lo: Int, mi: Int, hi: Int) {
            tmp.removeAll(keepingCapacity: true)
            var i = lo, j = mi
            while i != mi && j != hi {
                if self[j] < self[i] {
                    tmp.append(self[j])
                    j += 1
                } else {
                    tmp.append(self[i])
                    i += 1
                }
            }
            
            tmp.append(contentsOf: self[i..<mi])
            tmp.append(contentsOf: self[j..<hi])
            replaceSubrange(lo..<hi, with: tmp)
        }
        
        let n = count
        var size = 1
        while size < n {
            for lo in stride(from: 0, to: n - size, by: size * 2) {
                merge(lo: lo, mi: (lo + size), hi: Swift.min(lo + size * 2, n))
            }
        }
    }
}
#if false
protocol AlertViewDelegate: AnyObject {
    func buttonTapped(atIndex: Int)
}

class AlertView {
    var buttons: [String]
    weak var delegate: AlertViewDelegate?
    
    init(buttons: [String] = ["OK", "Cancel"]) {
        self.buttons = buttons
    }
    
    func fire() {
        delegate?.buttonTapped(atIndex: 1)
    }
}

class ViewController2: AlertViewDelegate {
    let alert: AlertView
    
    init() {
        alert = AlertView(buttons: ["OK", "Cancel"])
        alert.delegate = self
    }
    
    func buttonTapped(atIndex index: Int) {
        print("Button tapped: \(index)")
    }
}
#endif
#if false
protocol AlertViewDelegate {
    mutating func buttonTapped(atIndex: Int)
}

class AlertView {
    var buttons: [String]
    var delegate: AlertViewDelegate?
    
    init(buttons: [String] = ["OK", "Cancel"]) {
        self.buttons = buttons
    }
    
    func fire() {
        delegate?.buttonTapped(atIndex: 1)
    }
}

struct TapLogger: AlertViewDelegate {
    var taps: [Int] = []
    mutating func buttonTapped(atIndex index: Int) {
        taps.append(index)
    }
}
#endif

class AlertView {
    var buttons: [String]
    var buttonTapped: ((_ buttonIndex: Int) -> ())?
    
    init(buttons: [String] = ["OK", "Cancel"]) {
        self.buttons = buttons
    }
    
    func fire() {
        buttonTapped?(1)
    }
}

struct TapLogger {
    var taps: [Int] = []
    
    mutating func logTap(index: Int) {
        taps.append(index)
    }
}

class ViewController3 {
    let alert: AlertView
    
    init() {
        alert = AlertView(buttons: ["OK", "Cancel"])
        alert.buttonTapped = {[weak self] index in
            self?.buttonTapped(atIndex: index)
        }
    }
    
    func buttonTapped(atIndex index: Int) {
        print("Button tapped: \(index)")
    }
}

func increment(value: inout Int) {
    value += 1
}

extension Point {
    var squaredDistance: Int {
        return x * x + y * y
    }
}

postfix func ++(x: inout Int) {
    x += 1
}

func incrementTenTimes(value: inout Int) {
    func inc() {
        value += 1
    }
    for _ in 0..<10 {
        inc()
    }
}
/*
func escapeIncrement(value: inout Int) -> () -> () {
    func inc() {
        value += 1
    }
//    Nested function cannot capture inout parameter and escape
    return inc
}
 */

func incref(pointer: UnsafeMutablePointer<Int>) -> () -> Int {
    return {
        pointer.pointee += 1
        return pointer.pointee
    }
}

struct GPSTrack {
    private(set) var record: [(CLLocation, Date)] = []
}

extension GPSTrack {
    var timestamps: [Date] {
        return record.map {$0.1}
    }
}

class SettingsController: UIViewController {
    @IBOutlet weak var label: UILabel? {
        didSet {
            label?.textColor = .black
        }
    }
}

class Robot {
    enum State {
        case stopped, movingForward, turningRight, turningLeft
    }
    var state = State.stopped
}

class ObservableRebot: Robot {
    override var state: State {
        willSet {
            print("状态从 \(state) 迁移到 \(newValue)")
        }
    }
}

class GPSTrackViewController: UIViewController {
    var track: GPSTrack = GPSTrack()
    
    lazy var preview: UIImage = {
        for point in track.record {
            
        }
        return UIImage()
    }()
}

struct Point2 {
    var x: Double
    var y: Double
    
    private(set) lazy  var distanceFromOrigin: Double = (x * x + y * y).squareRoot()
    
    init(x: Double, y: Double) {
        self.x = x
        self.y = y
    }
}

extension Collection {
    subscript(indices indexList: Index...) -> [Element] {
        var result: [Element] = []
        for index in indexList {
            result.append(self[index])
        }
        return result
    }
}

extension Dictionary {
    subscript<Result>(key: Key, as type: Result.Type) -> Result? {
        get {
            return self[key] as? Result
        }
        set {
            guard let value = newValue as? Value else {
                return
            }
            self[key] = value
        }
    }
}