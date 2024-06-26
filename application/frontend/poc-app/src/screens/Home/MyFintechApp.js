import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Card, Title, Paragraph, List, Avatar, IconButton } from 'react-native-paper';

// Sample data for transactions (replace with your data fetching logic)
const transactions = [
  {
    id: 1,
    date: '2024-04-06',
    description: 'Payment to Store X',
    amount: -25.00,
  },
  {
    id: 2,
    date: '2024-04-05',
    description: 'Salary Deposit',
    amount: 2000.00,
  },
  // Add more transactions as needed
];

const MyFintechApp = () => {
  const [balance, setBalance] = useState(1500.00); // Replace with actual balance fetching logic

  useEffect(() => {
    // Simulate fetching balance from API (replace with your actual logic)
    const timeoutId = setTimeout(() => setBalance(2200.00), 6000);
    return () => clearTimeout(timeoutId);
  }, []);

  const renderItem = ({ item }) => (
    <List.Item
      title={item.description}
      description={item.date}
      left={() => <Avatar.Icon icon="transaction" />}
      right={() => (
        <Text style={item.amount > 0 ? styles.positiveAmount : styles.negativeAmount}>
          {item.amount.toFixed(2)}
        </Text>
      )}
    />
  );

  return (
    <View style={styles.container}>
      <Card style={styles.balanceCard}>
        <Card.Title title="Available Balance:" />
        <Card.Content>
          <Paragraph style={styles.balanceAmount}>${balance.toFixed(2)}</Paragraph>
        </Card.Content>
      </Card>

      <Title style={styles.transactionListTitle}>Recent Transactions</Title>
      <FlatList
        data={transactions}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />

      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.actionButton}>
          <IconButton icon="send" color="#fff" />
          <Text style={styles.actionButtonText}>Send</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <IconButton icon="receive" color="#fff" />
          <Text style={styles.actionButtonText}>Receive</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  balanceCard: {
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  transactionListTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  positiveAmount: {
    color: 'green',
  },
  negativeAmount: {
    color: 'red',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  actionButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default MyFintechApp;
