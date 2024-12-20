import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Dimensions } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import grammarService from "../../services/grammar.service";
import { GrammarModel } from "../../models";
import RenderHTML from "react-native-render-html";
import {
  HTMLElementModel,
  defaultHTMLElementModels,
  HTMLContentModel,
} from "react-native-render-html";
import { RootStackParamList } from "../../type";
import { ActivityIndicator } from "react-native-paper";

type DetailGrammarRouteProp = RouteProp<RootStackParamList, "GrammarDetail">;

const { height, width } = Dimensions.get("window");

export default function DetailGrammar() {
  const route = useRoute<DetailGrammarRouteProp>();
  const { id } = route.params;
  const [grammar, setGrammar] = useState<GrammarModel | null>(null);

  useEffect(() => {
    const fetchGrammarDetail = async () => {
      try {
        const res = await grammarService.getGrammarById(id);
        if (res.data) {
          // Preprocess the HTML content to remove \t and \n characters
          const preprocessedContent = res.data.content
            .replace(/\t/g, "")
            .replace(/\n/g, "");
          setGrammar({ ...res.data, content: preprocessedContent });
        }
      } catch (error) {
        console.error("Error fetching grammar:", error);
      }
    };
    fetchGrammarDetail();
  }, [id]);

  const { width } = Dimensions.get("window");

  const customHTMLElementModels = {
    ...defaultHTMLElementModels,
    iframe: HTMLElementModel.fromCustomModel({
      tagName: "iframe",
      mixedUAStyles: {
        width: "100%",
        height: 200,
      },
      contentModel: HTMLContentModel.block,
      isOpaque: true,
    }),
    video: HTMLElementModel.fromCustomModel({
      tagName: "video",
      mixedUAStyles: {
        width: "100%",
        height: 200,
      },
      contentModel: HTMLContentModel.block,
      isOpaque: true,
    }),
    input: HTMLElementModel.fromCustomModel({
      tagName: "input",
      contentModel: HTMLContentModel.block,
    }),
  };

  return (
    <ScrollView className="flex-1 w-full h-full justify-center items-center">
      {grammar ? (
        <View className="p-5">
          <RenderHTML
            contentWidth={width}
            source={{ html: grammar.content || "" }}
            customHTMLElementModels={customHTMLElementModels}
            ignoredDomTags={[]}
          />
        </View>
      ) : (
        <View className="flex-1 items-center justify-center w-full h-full">
          <ActivityIndicator size={"large"} />
        </View>
      )}
    </ScrollView>
  );
}
