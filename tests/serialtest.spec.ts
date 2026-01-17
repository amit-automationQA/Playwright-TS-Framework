import {test,expect, Locator} from '@playwright/test';

test.describe.configure({ mode: 'serial' });

test('Verify Serial Test1 @regression',async ({page})=>{
    console.log("This is Test 1");
});

test('Verify Serial Test2 @regression',async ({page})=>{
    console.log("This is Test 2");
});

test('Verify Serial Test3 @regression',async ({page})=>{
    console.log("This is Test 3");
});

test('Verify Serial Test4 @regression',async ({page})=>{
    console.log("This is Test 4");
});

test('Verify Serial Test5 @regression',async ({page})=>{
    console.log("This is Test 5");
});