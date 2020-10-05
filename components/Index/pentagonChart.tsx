// link file
// import Prof from "./profile";

// link library
import React, { Component, useReducer } from "react";
import { RouteProps } from "react-router";

import Link from "next/link";
import Circle from "react-circle";

// charts.js import
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, Tooltip } from 'recharts';

const ProgDataRadar = [
  { rank: 'Ruby', value: 120 },
  { rank: 'Python', value: 85 },
  { rank: 'flutter', value: 65 },
  { rank: 'swift', value: 35 },
  { rank: 'Java', value: 35 },
];
const otherDataRadar = [
  { rank: 'Ruby', value: 120 },
  { rank: 'Python', value: 85 },
  { rank: 'flutter', value: 65 },
  { rank: 'swift', value: 35 },
  { rank: 'Java', value: 35 },
];


class PentagonChart extends Component<RouteProps> {
  constructor(props) {
    super(props);
  }

  // 一度レンダリングした後、loadingを表示させ、componentDidMountの直後、
  // 再度レンダリングでユーザーのプロフを表示させる
  render() {
    return (
      <div className="chartBoxes">
       <div className="chartContents">
        <h4>使用言語・レベル</h4>
        <RadarChart // レーダーチャートのサイズや位置、データを指定
              height={250} //レーダーチャートの全体の高さを指定
              width={350} //レーダーチャートの全体の幅を指定
              cx="50%" //要素の左を基準に全体の50%移動
              cy="50%" //要素の上を基準に全体の50%移動
              data={ProgDataRadar} //ここにArray型のデータを指定
              
            >
              <PolarGrid /> 
              <PolarAngleAxis
                dataKey="rank" //Array型のデータの、数値を表示したい値のキーを指定
              />
               <Radar //レーダーの色や各パラメーターのタイトルを指定
                 dataKey="value" //Array型のデータのパラメータータイトルを指定
                 stroke="#4C70A8"  //レーダーの線の色を指定
                 fill="#4C70A8" //レーダーの中身の色を指定
                 fillOpacity={0.6} //レーダーの中身の色の薄さを指定
               />
                 <Tooltip /> 
        </RadarChart>
        </div>
       <div className="chartContents">
        <h4>趣味・その他スキルレベル</h4>
        <RadarChart // レーダーチャートのサイズや位置、データを指定
              height={250} //レーダーチャートの全体の高さを指定
              width={350} //レーダーチャートの全体の幅を指定
              cx="50%" //要素の左を基準に全体の50%移動
              cy="50%" //要素の上を基準に全体の50%移動
              data={otherDataRadar} //ここにArray型のデータを指定
            >
              <PolarGrid /> 
              <PolarAngleAxis
                dataKey="rank" //Array型のデータの、数値を表示したい値のキーを指定
              />
               <Radar //レーダーの色や各パラメーターのタイトルを指定
                 dataKey="value" //Array型のデータのパラメータータイトルを指定
                 stroke="#4C70A8"  //レーダーの線の色を指定
                 fill="#4C70A8" //レーダーの中身の色を指定
                 fillOpacity={0.6} //レーダーの中身の色の薄さを指定
               />
                 <Tooltip /> 
        </RadarChart>
       </div>
      </div>
    );
  }
}

export default PentagonChart;
