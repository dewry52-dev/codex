import test from 'node:test';
import assert from 'node:assert/strict';
import {countText,pageText} from '../dist/pdf-counter/count.js';
test('counts Korean, punctuation and emoji; excludes line breaks and optionally whitespace',()=>{
  assert.deepEqual(countText('한글 A!\n🙂\t'),{withSpaces:7,withoutSpaces:5});
  assert.deepEqual(countText('\u1100\u1161'),{withSpaces:1,withoutSpaces:1});
  assert.deepEqual(countText(' \n\t'),{withSpaces:2,withoutSpaces:0});
});
test('joins fragmented PDF text without inserting artificial spaces',()=>{
  assert.equal(pageText([{str:'He'},{str:'llo'},{str:' '},{str:'world',hasEOL:true},{type:'marked'}]),'Hello world\n');
});

