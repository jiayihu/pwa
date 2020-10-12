export type Fruit = 'apple' | 'cherry' | 'orange' | 'peach' | 'pear';
export type Villager = 'celeste' | 'neither' | 'daisy';

export interface Island {
  name: string;
  player: string;
  fruit: Fruit;
  hemisphere: 'north' | 'south';
  villager: Villager;
}
