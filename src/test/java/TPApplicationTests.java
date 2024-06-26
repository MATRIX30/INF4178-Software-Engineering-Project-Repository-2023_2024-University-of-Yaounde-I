import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import static com.actif.utils.AHP.*;


@SpringBootTest(classes = TPApplicationTests.class)
public class TPApplicationTests {

    @Test
    void contextLoads() {
    }

    @Test
    void ahp() {
        double[][] criteriaMatrix = {
                {1, 5, 4, 7},
                {1.0 / 5, 1, 2, 3},
                {1.0 / 4, 1.0 / 2, 1, 3},
                {1.0 / 7, 1.0 / 3, 1.0 / 3, 1}
        };

        double[][] normalizedMatrix = normalizeMatrix(criteriaMatrix);
        double[] weights = calculateWeights(normalizedMatrix);
        double consistencyRatio = calculateConsistencyRatio(criteriaMatrix, weights);

        System.out.println("Normalized Matrix:");
        for (double[] row : normalizedMatrix) {
            for (double value : row) {
                System.out.printf("|\t%.4f\t", value);
            }
            System.out.println("|");
        }

        System.out.println("\nWeights:");
        for (double weight : weights) {
            System.out.printf("|\t%.4f\t", weight);
        }
        System.out.println("|");

        System.out.println("\n\nConsistency Ratio: " + consistencyRatio);
        if (consistencyRatio < 0.1) {
            System.out.println("The consistency ratio is acceptable.");
        } else {
            System.out.println("The consistency ratio is not acceptable.");
        }
    }

}
