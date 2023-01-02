package main

import (
	"bufio"
	"fmt"
	"os"
	"sort"
	"strconv"
)

func check(e error) {
	if e != nil {
		panic(e)
	}
}

func main() {
	// open file
	readFile, err := os.Open("calories.txt")
	check(err)

	// read file contents by line
	fileScanner := bufio.NewScanner(readFile)

	var caloriesPerElf [][]int
	var currentElfCalories []int

	// for each line, add calorie counts to currentElfCalories or if empty line, push group to caloriesPerElf and reset
	for fileScanner.Scan() {
		var currentLine = fileScanner.Text()
		if currentLine != "" {
			calorieCount, _ := strconv.ParseInt(currentLine, 10, 32)
			currentElfCalories = append(currentElfCalories, int(calorieCount))
		} else {
			caloriesPerElf = append(caloriesPerElf, currentElfCalories)
			currentElfCalories = nil
		}
	}
	readFile.Close()

	// for the items in calorieGroup per elf, sum calories to provide total calories held per elf
	var calorieSums []int
	for _, calorieGroup := range caloriesPerElf {
		currentSum := 0
		for _, calorieItem := range calorieGroup {
			currentSum += calorieItem
		}
		calorieSums = append(calorieSums, currentSum)
	}

	// sum three top values
	fmt.Println(sumTopValues(calorieSums, 3))
}

// sum a number of top values in array
func sumTopValues(data []int, count int) int {
	var newData []int
	newData = append(newData, data...)
	sort.Sort(sort.Reverse(sort.IntSlice(newData)))
	sum := 0
	for i := 0; i <= count-1; i++ {
		sum += newData[i]
	}
	return sum
}
