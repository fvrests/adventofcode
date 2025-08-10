use std::{collections::HashSet, fs, io::Error};

fn main() -> Result<(), Error> {
    let contents: String = fs::read_to_string("rucksacks.txt").expect("Error reading file");
    let sacks: Vec<&str> = contents.lines().collect();

    fn shared(a: &str, b: &str) -> str {
        a.chars().filter(|&c| b.contains(c))
    }

    for sack in sacks {
        let (c1, c2) = &sack.split_at(sack.len() / 2);
        println!("shared {:?}", shared(c1, c2));
    }

    Ok(())
}
