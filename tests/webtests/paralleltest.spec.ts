import {test,expect, Locator} from '@playwright/test';

//configure the tests in parallel mode
test.describe.configure({ mode: 'parallel' });

test('Verify Test1',async ({page})=>{
    console.log("This is Test 1");
});

test('Verify Test2',async ({page})=>{
    console.log("This is Test 2");
});

test('Verify Test3',async ({page})=>{
    console.log("This is Test 3");
});

test('Verify Test4',async ({page})=>{
    console.log("This is Test 4");
});

test('Verify Test5',async ({page})=>{
    console.log("This is Test 5");
});