import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Icon } from "@rneui/base";
import { useNavigation } from "@react-navigation/native";
import { GrammarScreenNavigationProp } from "../../type";
import grammarService from "../../services/grammar.service";
import GrammarModel from "../../models/GrammarModel";
import MainHeader from "../../components/MainHeader";

const Grammar = () => {
  const [grammars, setGrammars] = useState<GrammarModel[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigation = useNavigation<GrammarScreenNavigationProp>();

  const fetchGrammar = async () => {
    try {
      const res = await grammarService.getGrammar();
      if (res.data && Array.isArray(res.data)) {
        setGrammars(res.data);
      } else {
        setError("No grammar data available");
      }
    } catch (error) {
      console.error("Error fetching grammar:", error);
      setError("Error fetching grammar data");
    }
  };

  useEffect(() => {
    fetchGrammar();
  }, []);


  const renderItem = ({ item }: { item: GrammarModel }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("GrammarDetail", { id: item.id })}
      key={item.id}
      style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: "#ccc" }}
    >
      <Text style={{ fontSize: 18 }}>{item.title}</Text>
      <Text>{item.description}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <MainHeader />
      <View style={{ flex: 1, padding: 10 }}>
        {error ? (
          <Text style={{ color: "red" }}>{error}</Text>
        ) : (
          <FlatList
            data={grammars}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Grammar;
