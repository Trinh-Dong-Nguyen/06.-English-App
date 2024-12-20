import { View, Text, Dimensions, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { RouteProp, useRoute } from "@react-navigation/native";
import sectionService from "../../services/section.service";
import { RootStackParamList } from "../../type";
import { Section } from "../../models";
import RenderHTML from "react-native-render-html";

export default function SectionRoot() {
  const route = useRoute<RouteProp<RootStackParamList, "SectionRoot">>();
  const { sectionID } = route.params;
  const [section, setSection] = useState<Section | null>(null);

  // Fetch section data from API
  useEffect(() => {
    const fetchSection = async () => {
      try {
        const response = await sectionService.getSectionById(sectionID);
        setSection(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchSection();
  }, [sectionID]);

  console.log(section);
  const {questions} = section || {questions: []};

  const { width } = Dimensions.get("window");
  return (
    <ScrollView>
       {questions.map((question, index) => (
        <View key={index}>
            <RenderHTML source={{ html: question.text }} contentWidth={width} />
        </View>
          
       ))}
      
    </ScrollView>
  );
}
