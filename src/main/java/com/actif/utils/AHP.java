package com.actif.utils;

public class AHP {
    public static double[][] normalizeMatrix(double[][] matrix) {
        int size = matrix.length;
        double[] columnSums = new double[size];
        double[][] normalizedMatrix = new double[size][size];

        for (int i = 0; i < size; i++) {
            for (double[] doubles : matrix) {
                columnSums[i] += doubles[i];
            }
        }

        for (int i = 0; i < size; i++) {
            for (int j = 0; j < size; j++) {
                normalizedMatrix[j][i] = matrix[j][i] / columnSums[i];
            }
        }

        return normalizedMatrix;
    }

    public static double[] calculateWeights(double[][] normalizedMatrix) {
        int size = normalizedMatrix.length;
        double[] weights = new double[size];

        for (int i = 0; i < size; i++) {
            double sum = 0;
            for (int j = 0; j < size; j++) {
                sum += normalizedMatrix[i][j];
            }
            weights[i] = sum / size;
        }

        return weights;
    }

    public static double calculateConsistencyRatio(double[][] matrix, double[] weights) {
        int size = matrix.length;
        double cr;
        double[] weightedSum = new double[size];

        for (int i = 0; i < size; i++) {
            for (int j = 0; j < size; j++) {
                weightedSum[i] += matrix[i][j] * weights[j];
            }
        }

        double lambdaMax = 0;
        for (int i = 0; i < size; i++) {
            lambdaMax += weightedSum[i] / weights[i];
        }
        lambdaMax /= size;

        double ci = (lambdaMax - size) / (size - 1);
        double[] riValues = {0, 0, 0.58, 0.9, 1.12, 1.24, 1.32, 1.41, 1.45}; // jusqu'à 9 critères
        double ri = riValues[size - 1];

        cr = ci / ri;

        return cr;
    }
}