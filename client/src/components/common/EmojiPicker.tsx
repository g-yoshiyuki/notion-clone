import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

interface EmojiPickerProps {
  icon: string;
  onChange: any;
}

// React.FCは関数コンポーネントの型を表す。
/* <EmojiPickerProps>は、EmojiPickerコンポーネントが受け取るpropsの型を指定。 */
const EmojiPicker: React.FC<EmojiPickerProps> = (props) => {
  const [selectedEmoji, setSelectedEmoji] = useState<string>();
  const [isShowPicker, setIsShowPicker] = useState(false);

  useEffect(() => {
    setSelectedEmoji(props.icon);
  }, [props.icon]);

  const handleClick = () => {
    setIsShowPicker(!isShowPicker);
  };

  const selectEmoji = (e: any) => {
    // 絵文字によってはハイフンで区切られたコードがあるため、
    // 指定した区切り文字で分割して、配列に変換する。
    const emojiCode = e.unified.split("-");
    let codesArray:Array<number> = [];

    // "0x"は16進数を表す文字列の前に付ける接頭辞
    // 文字列を数値に変換する際に、変換前の数値が16進数であることが明示的になる。
    // fromCodePointはcodeから絵文字に変換するための関数
    // fromCodePointの引数はnumber型しか受け取れないため、parseIntで整数にしている。
    // 第2引数の16は、第1引数の進数を伝えている。
    emojiCode.forEach((code:any) => {
      codesArray.push(parseInt("0x" + code, 16));
    });
    const emoji = String.fromCodePoint(...codesArray);
    setIsShowPicker(false);
    props.onChange(emoji);
  };

  return (
    <Box>
      <Typography
        variant="h3"
        fontWeight="700"
        sx={{ cursor: "pointer" }}
        onClick={handleClick}
      >
        {props.icon}
      </Typography>

      <Box
        sx={{
          display: isShowPicker ? "block" : "none",
          position: "absolute",
          zIndex: "5",
        }}
      >
        <Picker onEmojiSelect={selectEmoji} />
      </Box>
    </Box>
  );
};

export default EmojiPicker;
