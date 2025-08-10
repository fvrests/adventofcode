use std::{fs, io::Error};

fn calories_per_elf(contents: &str) -> Vec<usize> {
    contents
        .split("\n\n")
        .map(|elf| {
            elf.split("\n")
                .filter_map(|line| line.parse::<usize>().ok())
                .sum::<usize>()
        })
        .collect()
}

fn find_max(array: &Vec<usize>, count: usize) -> usize {
    let mut working_array = array.clone();
    working_array.sort_by(|a, b| b.cmp(a));
    let res = &working_array[..count];
    res.into_iter().sum()
}

fn main() -> Result<(), Error> {
    let contents: String = fs::read_to_string("calories.txt").expect("Error reading file");

    let cpe = calories_per_elf(&contents);

    println!("{:?}", find_max(&cpe, 1));
    println!("{:?}", find_max(&cpe, 3));

    Ok(())
}
